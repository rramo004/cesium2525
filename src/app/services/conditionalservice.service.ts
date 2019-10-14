import { Injectable } from '@angular/core';
import { TrackmanagerService } from './trackmanager.service';
import { ViewerService } from './viewer.service';
import { Track } from '../classes/track';
import { FiltermanagerService } from './filtermanager.service';

@Injectable({
  providedIn: 'root'
})
export class ConditionalsService {

  constructor(private viewerService: ViewerService,
              private tmService: TrackmanagerService,
              private fmService: FiltermanagerService) {
    this.getUpdate();
  }

  tracks: Track[];
  getUpdate() {
    setInterval(() => {
      this.tracks = this.tmService.getTracks();
      this.checkSpeed();
      this.blink();
    }, 500);
  }


  checkSpeed() {
    for(let i = 0; i < this.tracks.length; i++) {
      this.tracks[i].spdCond = (this.tracks[i].spd >= this.fmService.getSpeed()) ? true : false; 
    }
  }

  blink() {
    if (this.tracks != null) {
      for (let track of this.tracks) {
        if (track.spdCond) {
          this.viewerService.viewer.entities.getById(track.id).show = !this.viewerService.viewer.entities.getById(track.id).show
        }
      }
     }
    
  }
  
}
