import { Injectable } from '@angular/core';
import { TrackmanagerService } from './trackmanager.service';
import { ViewerService } from './viewer.service';
import { Track } from '../classes/track';
import { FiltermanagerService } from './filtermanager.service';

@Injectable({
  providedIn: 'root'
})
export class ConditionalsService {

  tracks: Track[];

  constructor(private viewerService: ViewerService,
    private tmService: TrackmanagerService,
    private fmService: FiltermanagerService) {

    this.tracks = this.tmService.getTracks();
    this.fmService.setSpeed(20);
    this.fmService.setAlt(10000);

    this.tmService.observableTrack.subscribe(response => {
      this.tracks = response;
    });

    // this.getUpdate()
  }

  getUpdate() {
    setInterval(() => {
      // this.checkCond();
    }, 600);
  }

  // checkCond() {
  //   for (let track of this.tracks) {

  //     if (track.spd >= this.fmService.getSpeed()) {
  //       if (!track.spdAck && this.viewerService.viewer.entities.getById(track.id) != null) {
  //         if (this.viewerService.viewer.entities.getById(track.id).isShowing) {
  //           this.viewerService.viewer.entities.getById(track.id).show = false;
  //         }
  //         else {
  //           this.viewerService.viewer.entities.getById(track.id).show = true;
  //         }
  //       }
  //     }
  //     else if (track.alt >= this.fmService.getAlt()) {
  //       if (!track.altAck) {
  //         if (this.viewerService.viewer.entities.getById(track.id).isShowing) {
  //           this.viewerService.viewer.entities.getById(track.id).show = false;
  //         }
  //         else {
  //           this.viewerService.viewer.entities.getById(track.id).show = true;
  //         }
  //       }
  //     }
  //     else if (track.spdAck || track.altAck) {
  //       this.viewerService.viewer.entities.getById(track.id).show = true;
  //     }
  //   }
  // }
}
