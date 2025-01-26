import { Component, OnInit } from '@angular/core';
import ChatService from '../services/chat.service';
import {MatButtonModule} from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-chat-page',
  imports: [MatButtonModule, MatInputModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements OnInit {
  response$ = new BehaviorSubject<string>('');
  wsconnect$ = new BehaviorSubject<boolean>(false);
  constructor(private chatService: ChatService) {}
  ngOnInit(): void {
    this.wsconnect$ = this.chatService.connectionStatus$
  }

  onConnect(): void {
    this.chatService.connect().subscribe({
      next: (value) => {
        this.response$.next(value);
      },
      complete: () => console.log('completed on chat page'),
      error: (err) => console.log(err) 
      
    })
  }

  onDisconnect(): void {
    this.chatService.disconnect();
    this.response$.next('');
  }

  onSendMessage() {
    this.chatService.sendMessage('hi','sendmessage')
  }


}
