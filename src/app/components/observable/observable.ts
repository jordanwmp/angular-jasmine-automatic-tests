import { Component, inject } from '@angular/core';
import { ObservableTest } from '../../services/observable-test';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-observable',
  imports: [CommonModule],
  templateUrl: './observable.html',
  styleUrl: './observable.scss'
})
export class Observable {

  items:string[] = []
  error = false 
  service = inject(ObservableTest)

  loadItems():void{
    this.error = false 
    this.service.getItems().subscribe({
      next: data => this.items = data,
      error: () => this.error = true
    })
  }
  

}
