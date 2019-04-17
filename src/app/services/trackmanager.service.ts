import { Injectable } from '@angular/core';
import { Track } from '../classes/track';

@Injectable({
  providedIn: 'root'
})
export class TrackmanagerService {

  tracks: Track[];
  constructor() { 
    this.tracks = [];
  }

  getTracks(): Track[] {
    return this.tracks;
  }

  clearTracks() {
    this.tracks = [];
  }
}
