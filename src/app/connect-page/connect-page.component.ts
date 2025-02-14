import { Component, OnInit } from '@angular/core';
import ChatService from '../services/chat.service';
import {MatButtonModule} from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-chat-page',
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './connect-page.component.html',
  styleUrl: './connect-page.component.scss'
})
export class ConnectPageComponent implements OnInit {
  form;
  response$ = new BehaviorSubject<string>('');
  wsconnect$ = new BehaviorSubject<boolean>(false);
  constructor(private chatService: ChatService, private fb: FormBuilder) {
    this.form = this.fb.group({
      'message': [''],
    })
  }
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
    this.form.get('message')?.setValue('');
  }

  onSendMessage() {
    //console.log( this.form.get('message')?.value);
    let value = this.form.get('message')?.value
    if (value === null || value === undefined) {

    } else {
      this.chatService.sendMessage(value,'sendmessage')
    }
   
    
  }


}
