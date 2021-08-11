
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import * as socketio from 'socket.io-client';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private url = 'http://localhost:4444';
  private socket = socketio(this.url);
  private subjectMessages: Subject<Message> = new Subject<Message>();

  constructor() {
    this.socket.on('message', (m: Message) => {
      this.subjectMessages.next(m);
    });
  }


  send(msg: Message) {
    this.socket.emit('message', msg);
  }

  messages(){
    return this.subjectMessages.asObservable();
  }


}
