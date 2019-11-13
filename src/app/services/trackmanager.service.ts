import { Injectable } from '@angular/core';
import { Track } from '../classes/track';

@Injectable({
  providedIn: 'root'
})
export class TrackmanagerService {

  tracks: Track[];
  private filterEnabled: boolean;

  constructor() { 
    this.tracks = [];
    this.filterEnabled = false;
  }

  getTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(id: string): Track {
    for (let track of this.tracks) {
      if (track.id == id) {
        return track;
      }
    }
    return null;
  }

  getTrackIndexById(id: string): number{
    for (let i = 0; i < this.tracks.length; i++) {
      if (this.tracks[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  containsTrack(track: Track): boolean {
    if (this.tracks != null) {
      for (let trk of this.tracks) {
        if (track.id == trk.id) {
          return true;
        }
      }
    }
    return false;
  }

  pushTrack(track: Track) {
    if (this.containsTrack(track)) {
      let index = this.getTrackIndexById(track.id);
      this.tracks[index] = track; 
    }
    else {
      this.tracks.push(track);
    }
  }

  clearTracks() {
    this.tracks = [];
  }

  removeTrackById(id: string) {
    let index = this.getTrackIndexById(id);

    if (index != -1)
      delete this.tracks[index];
  }

  getFilterEnabled(): boolean {
    return this.filterEnabled;
  }

  setFilterEnabled(enabled: boolean) {
    this.filterEnabled = enabled;
  }
}
