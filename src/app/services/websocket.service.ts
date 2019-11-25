import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { XmljsonserviceService } from './xmljsonservice.service';
import { MilsymService } from './milsym.service';
import { ViewerService } from './viewer.service';
import { TrackmanagerService } from './trackmanager.service';
import { Track } from '../classes/track';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket;
  _connected: boolean = false;
  observableConnected: BehaviorSubject<boolean>;

  constructor(
    private xmljsonService: XmljsonserviceService,
    private milsymService: MilsymService,
    public viewerService: ViewerService,
    public tmService: TrackmanagerService) {
    this.observableConnected = new BehaviorSubject<boolean>(this._connected);
    this.connect();
  }

  sendMessage() {
    this.socket.emit('newMessage', "Client send message to server");
  }

  onStartupMessage() {
    return Observable.create(observer => {
      this.socket.on('startup', message => {
        observer.next(message);
      });
    });
  }

  onCreateTrackMessage() {
    return Observable.create(observer => {
      this.socket.on('createTrack', message => {
        observer.next(message);
      });
    });
  }

  onRemoveTrackMessage() {
    return Observable.create(observer => {
      this.socket.on('removeTrack', message => {
        observer.next(message);
      });
    });
  }

  onUpdateTrackMessage() {
    return Observable.create(observer => {
      this.socket.on('updateTrack', message => {
        observer.next(message);
      });
    });
  }

  getURL(): string {
    // return 'http://10.22.58.77:4567';
    // return 'http://10.22.59.23:4567';
    return 'http://10.22.58.212:4567';
    // return 'http://localhost:4567';
  }

  get connected() {
    return this._connected;
  }

  connect() {
    this.socket = io(this.getURL());
    this.socket.on('connect', message => {
      console.log("Connected to the Server!");
      this._connected = true;
      this.eventConnectedChange();

      this.onStartupMessage().subscribe(response => {
        //console.log(response);
        if (response != null) {
          this.milsymService.clearTracks();
          this.tmService.clearTracks();

          this.xmljsonService.parseJSON(response);
          this.milsymService.plotTracks();
          this.milsymService.trackOverlayFilter(this.tmService.getFilterEnabled());
        }
        else {
          this.milsymService.clearTracks();
          this.tmService.clearTracks();
        }
      });

      this.onCreateTrackMessage().subscribe(response => {
        //console.log(response);
        if (response != null) {
          let track: Track = this.xmljsonService.parseCreateTrackJSON(response);
          this.tmService.pushTrack(track);
          this.milsymService.plotTrack(track);
          this.milsymService.trackOverlayFilter(this.tmService.getFilterEnabled());
        }
      });

      this.onRemoveTrackMessage().subscribe(response => {
        //console.log(response);
        if (response != null) {
          let id: string = this.xmljsonService.parseRemoveTrackJSON(response);
          this.tmService.removeTrackById(id);
          this.milsymService.removeTrack(id);
          this.milsymService.trackOverlayFilter(this.tmService.getFilterEnabled());
        }
      });

      this.onUpdateTrackMessage().subscribe(response => {
        //console.log(response);
        if (response != null) {
          let track: Track = this.xmljsonService.parseCreateTrackJSON(response);
          if (this.tmService.containsTrack(track)) {
            this.tmService.pushTrack(track);
            if (this.milsymService.containsTrack(track)) {
              this.milsymService.modifyTrack(track);
            }
          }
          else {
            this.tmService.pushTrack(track);
            this.milsymService.plotTrack(track);
          }
          this.milsymService.trackOverlayFilter(this.tmService.getFilterEnabled());
        }
      });
    });

    this.socket.on('disconnect', message => {
      console.log("Disconnected from the Server!");
      this._connected = false;
      this.eventConnectedChange();
    });
  }

  close() {
    this.socket.close();
    this._connected = false;
    this.eventConnectedChange();
    this.milsymService.clearTracks();
    this.tmService.clearTracks();
  }

  eventConnectedChange() {
    this.observableConnected.next(this._connected);
  }
}

