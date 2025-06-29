import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ObservableTest {

  //simula retornos de dados após 100ms
  getItems():Observable<string[]>{
    return of(['Alpha', 'Beta', 'Gamma']).pipe(delay(100))
  }
  
}
