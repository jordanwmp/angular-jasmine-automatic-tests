// import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
  standalone: true
})
export class Counter implements OnInit {

  @Input() start:number = 0
  @Output() changed = new EventEmitter<number>()

  public count:number  = 0

  ngOnInit()
  {
    this.count = this.start
  }

  increment(){
    this.count++
    this.changed.emit(this.count)
  }

  decrement(){
    this.count--
    this.changed.emit(this.count)
  }
}
