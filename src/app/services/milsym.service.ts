import { Injectable, ViewRef } from '@angular/core';
import { Track } from '../classes/track';
import * as ms from 'milsymbol';
import { ViewerService } from './viewer.service';
import { TrackmanagerService } from './trackmanager.service';
import { OverlaymanagerService } from './overlaymanager.service';

@Injectable({
  providedIn: 'root'
})
export class MilsymService {

  constructor(private viewerService: ViewerService,
    private tmService: TrackmanagerService,
    private olManagerServer: OverlaymanagerService) { }

  plotTrack(track: Track) {
    let sym = new ms.Symbol(
      track.type,
      {
        size: 25,
        infoColor: "#FFFFFF",
        outlineWidth: 2,
        quantity: track.name,
        staffComments: track.cse + '\u00B0',
        additionalInformation: track.spd + ' KT',
        direction: track.cse
      }
    );

    let lat: string = (track.lat).toString();
    let lon: string = (track.lon).toString();
    let desc: string =
      'Track Id: ' + track.name +
      '<br>Lat: ' + lat.slice(0, 5) + '\u00B0' +
      '<br>Lon: ' + lon.slice(0, 6) + '\u00B0' +
      '<br>Course: ' + track.cse + '\u00B0' +
      '<br>Speed: ' + track.spd + 'KT';
    let symbol = this.viewerService.viewer.entities.add(
      {
        id: track.id,
        name: track.name,
        description: desc,
        position: Cesium.Cartesian3.fromDegrees(track.lon, track.lat),
        billboard: {
          image: sym.asCanvas(), //Get the canvas for the billboard
          //pixelOffset : new Cesium.Cartesian2(-sym.markerAnchor.x, -sym.markerAnchor.y), // Symbol offset
          eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT, // default
          verticalOrigin: Cesium.VerticalOrigin.TOP,
        }
      });
  }

  plotTracks() {
    for (let i = 0; i < this.tmService.tracks.length; i++) {
      let sym = new ms.Symbol(
        this.tmService.tracks[i].type,
        {
          size: 25,
          infoColor: "#FFFFFF",
          outlineWidth: 2,
          quantity: this.tmService.tracks[i].name,
          staffComments: this.tmService.tracks[i].cse + '\u00B0',
          additionalInformation: this.tmService.tracks[i].spd + ' KT',
          direction: this.tmService.tracks[i].cse,
          // type: "Machine Gun",
          //dtg: tracks[i].dtg,
          // location: "0900000.0E570306.0N"
        }
      );

      let lat: string = (this.tmService.tracks[i].lat).toString();
      let lon: string = (this.tmService.tracks[i].lon).toString();
      let desc: string =
        'Track Id: ' + this.tmService.tracks[i].name +
        '<br>Lat: ' + lat.slice(0, 5) + '\u00B0' +
        '<br>Lon: ' + lon.slice(0, 6) + '\u00B0' +
        '<br>Course: ' + this.tmService.tracks[i].cse + '\u00B0' +
        '<br>Speed: ' + this.tmService.tracks[i].spd + 'KT';
      let symbol = this.viewerService.viewer.entities.add(
        {
          id: this.tmService.tracks[i].id,
          name: this.tmService.tracks[i].name,
          description: desc,
          position: Cesium.Cartesian3.fromDegrees(this.tmService.tracks[i].lon, this.tmService.tracks[i].lat),
          billboard: {
            image: sym.asCanvas(), //Get the canvas for the billboard
            //pixelOffset : new Cesium.Cartesian2(-sym.markerAnchor.x, -sym.markerAnchor.y), // Symbol offset
            eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT, // default
            verticalOrigin: Cesium.VerticalOrigin.TOP,
          }
        }
      )
    }
  }

  modifyTrack(track: Track) {
    let sym = new ms.Symbol(
      track.type,
      {
        size: 25,
        infoColor: "#FFFFFF",
        outlineWidth: 2,
        quantity: track.name,
        staffComments: track.cse + '\u00B0',
        additionalInformation: track.spd + ' KT',
        direction: track.cse
      }
    );

    let lat: string = (track.lat).toString();
    let lon: string = (track.lon).toString();
    let desc: string =
        'Track Id: ' + track.name +
        '<br>Lat: ' + lat.slice(0, 5) + '\u00B0' +
        '<br>Lon: ' + lon.slice(0, 6) + '\u00B0' +
        '<br>Course: ' + track.cse + '\u00B0' +
        '<br>Speed: ' + track.spd + 'KT';
    this.viewerService.viewer.entities.getById(track.id).name = track.name;
    this.viewerService.viewer.entities.getById(track.id).description = desc;
    this.viewerService.viewer.entities.getById(track.id).position = Cesium.Cartesian3.fromDegrees(track.lon, track.lat);
    this.viewerService.viewer.entities.getById(track.id).billboard = new Cesium.BillboardGraphics(
      {
        image: sym.asCanvas(), //Get the canvas for the billboard
        eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT, // default
        verticalOrigin: Cesium.VerticalOrigin.TOP,
      }
    )
  }

  removeTrack(id: String) {
    this.viewerService.viewer.entities.removeById(id);
  }

  clearTracks() {
    // viewer.entities.removeAll();
    if (this.tmService.tracks != null) {
      for (let track of this.tmService.tracks) {
        this.viewerService.viewer.entities.removeById(track.id);
        //viewer.entities.remove(viewer.entities.getById('tooltip'+track.id))
      }
    }
  }

  containsTrack(track: Track): boolean {
    if (track.id != null)
      return this.viewerService.viewer.entities.contains(this.viewerService.viewer.entities.getById(track.id));
    else
      return false;
  }

  trackOverlayFilter(filterEnabled: boolean) {
    for (let track of this.tmService.tracks) {
      this.viewerService.viewer.entities.getById(track.id).show = true;
    }

    for (let olFilter of this.olManagerServer.overlays) {
      filterEnabled = filterEnabled || olFilter.checked;
      this.tmService.setFilterEnabled(filterEnabled);
      if (filterEnabled) {
        if (olFilter.checked) {
          let ellipseCenter = this.viewerService.viewer.entities.getById(olFilter.id).position.getValue(this.viewerService.viewer.clock.currentTime);
          for (let track of this.tmService.tracks) {
            let trackPosValue = this.viewerService.viewer.entities.getById(track.id).position.getValue(this.viewerService.viewer.clock.currentTime);
            let distance = Cesium.Cartesian3.distance(ellipseCenter, trackPosValue);
            if (distance > olFilter.radius) {
              this.viewerService.viewer.entities.getById(track.id).show = false;
            }
          }
        }

      }
      else {
        for (let track of this.tmService.tracks) {
          this.viewerService.viewer.entities.getById(track.id).show = true;
        }
      }
    }
  }
}
