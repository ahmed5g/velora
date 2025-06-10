import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  INIT_STATE = "INIT";

  public send$ = new BehaviorSubject<ToastMessage>({
    severity: 'info',
    summary: this.INIT_STATE,
    detail: ''
  });

  sendSub = this.send$.asObservable();

  public send(message: ToastMessage): void {
    this.send$.next(message);
  }
}
