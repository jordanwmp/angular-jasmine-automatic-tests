import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Counter } from './counter';

describe('Counter Component', ()=>{
  //CONFIGURANDO O AMBIENTE
  let fixure: ComponentFixture<Counter>
  let component: Counter
  let el: HTMLElement

  beforeEach(async ()=>{
    //ESPERA O COMPONENTE SER INSTANCIADO
    await TestBed.configureTestingModule({
      // declarations: [Counter]
      imports: [Counter]
    })
    .compileComponents()
    
    //REFERENCIA  O COMPONENTE
    fixure = TestBed.createComponent(Counter)
    //INSTANCIA O COMPONENTE
    component = fixure.componentInstance
    el = fixure.nativeElement

  })//END BEFORE EACH

  it('deve inicializar count com @Input start ', () =>{
    component.start = 10
    component.ngOnInit()
    expect(component.count).toBe(10)
  })

  it('deve mostrar o valor inicial no template', () => {
    component.start = 5
    component.ngOnInit()
    fixure.detectChanges()
    const display = el.querySelector('[data-testid="display"]')!.textContent
    expect(display).toContain('Contador: 5')
  })

  it('increment() deve aumentar count e emitir o evento', () => {
    spyOn(component.changed, 'emit')
    component.count = 0
    component.increment()
    expect(component.count).toBe(1)
    expect(component.changed.emit).toHaveBeenCalledWith(1)
  })

  it('decrement() deve diminuir e emitir evento', () => {
    spyOn(component.changed, 'emit')
    component.count = 0
    component.decrement()
    expect(component.count).toBe(-1)
    expect(component.changed.emit).toHaveBeenCalledWith(-1)
  })

  it('click em + incrementa e atualiza a view', () => {
    fixure.detectChanges()
    const btnInc = el.querySelector('[data-testid="btn-inc"]') as HTMLButtonElement
    btnInc.click()
    fixure.detectChanges()

    const display = el.querySelector('[data-testid="display"]')!.textContent
    expect(display).toContain('Contador: 1')
  })

  it('Click em - decrementa e atualiza a view', () => {
    fixure.detectChanges()
    const btnDec = el.querySelector('[data-testid="btn-dec"') as HTMLButtonElement
    btnDec.click()
    fixure.detectChanges()

    const display = el.querySelector('[data-testid="display"]')!.textContent
    expect(display).toContain('Contador: -1')
  })

  afterEach(()=>{
    TestBed.resetTestingModule()
  })

})//END DESCRIBE

