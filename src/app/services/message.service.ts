import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages:string[]=[];
  
  constructor() { }
  getHeroesAsync(): Observable<String[]>{
    return of(this.messages)
  }
  add(message: string)
  {
    this.messages.push(message);
  }
  clear(){
    this.messages=[]
  }
}
