import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserForm } from './user-form';

describe('User Form', () => {
  let fixture: ComponentFixture<UserForm>
  let component: UserForm
  let elements: HTMLElement

  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      imports: [UserForm, ReactiveFormsModule]
    }).compileComponents()

    fixture = TestBed.createComponent(UserForm)
    component = fixture.componentInstance
    elements = fixture.nativeElement
    fixture.detectChanges()
  })

  it('deve começar com o formulário inválido', () => {
    expect(component.form.valid).toBeFalse()
    expect(component.form.get('name')!.valid).toBeFalse()
    expect(component.form.get('email')!.valid).toBeFalse()
  })

  it('preenchimento válido', () => {
    component.form.setValue({
      name: 'Jordan',
      email: 'example@email.com'
    })
    expect(component.form.valid).toBeTrue()
  })

  it('deve preencher inputs e submeter com sucesso', () => {
    const nameInput = elements.querySelector('[data-testid="name"]') as HTMLInputElement
    const emailInput = elements.querySelector('[data-testid="email"]') as HTMLInputElement 
    const submitBtn = elements.querySelector('[data-testid="submit"]') as HTMLButtonElement

    //simula digitação
    nameInput.value = 'Jordan'
    nameInput.dispatchEvent(new Event('input'))

    emailInput.value = 'example@email.com'
    emailInput.dispatchEvent(new Event('input'))

    fixture.detectChanges()

    //submete o formulário
    submitBtn.click()
    fixture.detectChanges()

    //verifica se foi enviado
    const success = elements.querySelector('[data-testid="success"]')
    expect(success).toBeTruthy()
    expect(component.submitted).toBeTrue()

  })

  it('deve marcar campo como touched e dirty após interação', () => {
    const nameControl = component.form.get('name')
    expect(nameControl?.touched).toBeFalse()
    expect(nameControl?.dirty).toBeFalse()

    //simula a interação
    const nameInput = elements.querySelector('[data-testid="name"]') as HTMLInputElement
    nameInput.value = "Jordan"
    nameInput.dispatchEvent(new Event('input'))
    nameInput.dispatchEvent(new Event('blur'))

    fixture.detectChanges()

    expect(nameControl?.touched).toBeTrue()
    expect(nameControl?.dirty).toBeTrue()

  })

})