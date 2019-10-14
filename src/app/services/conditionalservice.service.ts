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
    }, 500);
  }


  checkSpeed() {
    for(let track of this.tracks) {
      if (track.spd >= this.fmService.getSpeed()) {
        this.viewerService.viewer.entities.getById(track.id).show = !this.viewerService.viewer.entities.getById(track.id).show;
      }
      else {
        this.viewerService.viewer.entities.getById(track.id).show = true;
      }
    }
  }
  
}
