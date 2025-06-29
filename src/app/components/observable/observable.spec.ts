import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync
} from '@angular/core/testing';

import { By } from '@angular/platform-browser'
import { of, throwError } from 'rxjs'
import { delay } from 'rxjs/operators'

import { Observable as ObservableComponent } from './observable';
import { ObservableTest } from '../../services/observable-test';

describe('Observable component', () => {

  let fixture: ComponentFixture<ObservableComponent>
  let component: ObservableComponent
  let element: HTMLElement
  let serviceSpy: jasmine.SpyObj<ObservableTest>//MOCK DO SERVICE

  beforeEach(async () => {
    //CRIA UM SPYOBJ PARA O OBSERVALETEST SERVICE
    serviceSpy = jasmine.createSpyObj('ObservableTest', ['getItems'])
    await TestBed.configureTestingModule({
      imports: [ObservableComponent],
      providers: [
        { provide: ObservableTest, useValue: serviceSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ObservableComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement

  })//END BEFORE EACH

  it('deve carregar itens imediatamente (of)', () => {
    //1. prepara o spy para retornar um observable sincrono
    serviceSpy.getItems.and.returnValue(of(['X', 'Y', 'Z']))
    //2. dispara a ação
    component.loadItems()
    fixture.detectChanges()

    //3. verifica estado interno e template
    expect(component.items).toEqual(['X', 'Y', 'Z'])
    
    const items = element.querySelectorAll('[data-testid="item"]')
    expect(items.length).toBe(3)
    expect(items[0].textContent).toBe('X')
  })

  it('deve carregar itens com delay usando fakeAsync e tick', fakeAsync(()=>{
    //1. Spy retorna observable que emite após 100ms
    serviceSpy.getItems.and.returnValue(of(['A', 'B']).pipe(delay(100)))
    //2. clica no botão para chamar load itens
    fixture.detectChanges()
    fixture.debugElement
    .query(By.css('[data-testid="btn-load"]'))
    .triggerEventHandler('click', null)

    //3. Antes do tick, items ainda estão vazios
    expect(component.items).toEqual([])

    //4. avança 100ms virtuais para despachar o delay
    tick(100)
    fixture.detectChanges()

    //5. Agora o observable emitiu e o componente atualizou
    expect(component.items).toEqual(['A', 'B'])
    const items = element.querySelectorAll('[data-testid="item"]')
    expect(items.length).toBe(2)
  }))

  it('deve configurar error=true quando o Observable falha', ()=>{
    //1. Spy retorna um Observable de error
    serviceSpy.getItems.and.returnValue(throwError(()=>new Error('fail')))
    //2. carrega itens (erron será capturado no subscribe)
    component.loadItems()
    fixture.detectChanges()

    //3. A flag de error deve estar ativa
    expect(component.error).toBeTrue()

    //4. Template deve exbir a mensagem de error
    const errorElement = element.querySelector('[data-testid="error"]')
    expect(errorElement?.textContent).toBe('Error loading items')
  })

  afterEach(()=>{
    TestBed.resetTestingModule()
  })

})


