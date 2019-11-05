import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket;
  _connected: boolean = false;

  constructor() {
    this.socket = io(this.getURL());
    this.socket.on('connect', message =>
    {
      console.log("Connected to the Server!");
      this._connected = true;
    });
    this.socket.on('disconnect', message => 
    {
      console.log("Disconnected from the Server!");
      this._connected = false;
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

  get connected() {
    return this._connected;
  }

  close() {
    this.socket.close();
  }
}

