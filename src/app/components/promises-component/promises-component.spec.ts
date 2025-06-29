import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { By } from '@angular/platform-browser'
import { PromisesComponent } from './promises-component';


describe('Promise Componente', () => {

  let fixture: ComponentFixture<PromisesComponent>
  let component: PromisesComponent
  let elements: HTMLElement

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [PromisesComponent]
    })
      .compileComponents()

    fixture = TestBed.createComponent(PromisesComponent)
    component = fixture.componentInstance
    elements = fixture.nativeElement

  })

  it('simplePromise com DoneFn', (done: DoneFn) => {
    component.simplePromisse()
      .then(value => {
        expect(value).toBe(123)
        done()
      })
  })

  it('simplePromise retornando a promise', () => {
    return component.simplePromisse()
      .then(value => {
        expect(value).toBe(123)
      })
  })

  it('simplePromise com async/await', async () => {
    const value = await component.simplePromisse()
    expect(value).toBe(123)
  })

  it('loadData usando  waitForAsync e whenStable', fakeAsync(() => {
    //renderiza o template
    fixture.detectChanges()

    //dispara o click
    const btn = fixture.debugElement.query(
      By.css('[data-testid="btn-load"]')
    )

    btn.triggerEventHandler('click', null)
    //re-renderiza e espera o zone.js ficar estável
    fixture.detectChanges()
    tick(100)
    fixture.detectChanges()

    //busca o elemento de exibição e verifica o text
    const display = elements.querySelector('[data-testid="display"]')!.textContent
    expect(display).toContain('dados com atraso')

  }))

  afterEach(()=>{
    TestBed.resetTestingModule()
  })

})


