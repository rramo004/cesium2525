import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket;

  constructor() {
    this.socket = io(this.getURL());
    this.socket.on('connection', message =>
    {
      console.log("Connected to the Server!");
    });
  }

  sendMessage() {
    this.socket.emit('newMessage', "Client send message to server");
  }

  onNewMessage() {
    return Observable.create(observer =>
    {
      this.socket.on('newMessage', message =>
      {
        observer.next(message);
      }); 
    });
  }

  getURL(): string {
    return 'http://localhost:4567';
  }

  close() {
    this.socket.close();
  }
}

