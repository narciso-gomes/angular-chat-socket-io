import { Component } from '@angular/core';
import { Message } from './message';
import { SocketIoService } from './socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private nickname: string = '';
  private message: string = '';


  constructor(private socketService: SocketIoService) {

  }

  ngOnInit() {
    this.socketService.messages().subscribe(
      (m: Message) => {
        console.log(m);
      }
    )
  }

  send() {
    this.socketService.send({
      from: this.nickname,
      message: this.message
    });

    this.message = '';
  }

}
