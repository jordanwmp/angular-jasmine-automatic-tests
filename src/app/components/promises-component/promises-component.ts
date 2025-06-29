import { Component } from '@angular/core';

@Component({
  selector: 'app-promises-component',
  imports: [],
  templateUrl: './promises-component.html',
  styleUrl: './promises-component.scss'
})
export class PromisesComponent {
  
  data?:string;

  //1) promisse imediata
  simplePromisse():Promise<number>{
    return Promise.resolve(123)
  }

  //2) promise com atraso simulado via setTimeout
  fetchData():Promise<string>{
    return new Promise(resolve => {
      setTimeout(()=> resolve('dados com atraso'), 100)
    })
  }

  //3) metodo que atualiza data usando fetchData
  loadData():void
  {
    this.fetchData()
    .then(result=> this.data = result)
  }
}
