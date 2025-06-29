import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserForm {
  form!:FormGroup
  submitted = false

  constructor(
    private formBuilder: FormBuilder
  ){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  submit()
  {
    if(this.form.valid)
    {
      this.submitted = true
    }
  }

}
