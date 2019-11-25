import { Injectable } from '@angular/core';
import { Track } from '../classes/track';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackmanagerService {

  tracks: Track[];
  observableTrack: BehaviorSubject<Track[]>;
  private filterEnabled: boolean;
  observableFilter: BehaviorSubject<boolean>;

  constructor() { 
    this.tracks = [];
    this.observableTrack = new BehaviorSubject<Track[]>(this.tracks);
    this.filterEnabled = false;
    this.observableFilter = new BehaviorSubject<boolean>(this.filterEnabled);
  }

  /* Getters and Setters for track info */
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


  /* Adding and deleting to Track list*/
  pushTrack(track: Track) {
    if (this.containsTrack(track)) {
      let index = this.getTrackIndexById(track.id);
      this.tracks[index] = track; 
    }
    else {
      this.tracks.push(track);
    }

    this.eventTrackChange();
  }

  clearTracks() {
    this.tracks = [];
    this.eventTrackChange();
  }

  removeTrackById(id: string) {
    let index = this.getTrackIndexById(id);

    if (index != -1) {
      this.tracks.splice(index, 1);
      this.eventTrackChange();
    }
  }

  /* Getter and Setter for Filter Enabled/Disable */
  getFilterEnabled(): boolean {
    return this.filterEnabled;
  }

  setFilterEnabled(enabled: boolean) {
    this.filterEnabled = enabled;
    this.eventFilterChange();
  }

  eventFilterChange() {
    this.observableFilter.next(this.filterEnabled);
  }

  /* Observable for track changes */
  eventTrackChange() {
    this.observableTrack.next(this.tracks);
  }
}
