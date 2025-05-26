import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';


export interface ToastMessage{
  severity: string;
  summary: string;
  detail?:string;

}
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  readonly INIT_STATE = 'INIT';
  private sendSub = new Subject<ToastMessage>();

  constructor() { }

  get send$(){
    return this.sendSub.asObservable();
  }
  sendMessage(message: ToastMessage) {
    this.sendSub.next(message);
  }

}
