import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
 export default class ChatService {
  // Public BehaviorSubject to track connection status
  public connectionStatus$ = new BehaviorSubject<boolean>(false);


  wsSubject = webSocket({
    url: 'wss://yzr6zuz6fh.execute-api.us-east-1.amazonaws.com/Prod/',
    openObserver: {
      next: (value) => {
        console.log('Connected');
        this.connectionStatus$.next(true);
        //this.sendMessage("hi", "sendmessage")
      }
    },
    closeObserver: {
      next: () => {
        console.log('closed');
        this.connectionStatus$.next(false);
      },
    },
  });

  connect(): Observable<any> {
    return this.wsSubject.asObservable();
  }

  disconnect(): void {
    this.wsSubject.complete();
  }
  sendMessage(message: string, action: string) {
    const payload = {
      "action": action,
      "message": message
  }
    this.wsSubject.next(payload)
  }

}
