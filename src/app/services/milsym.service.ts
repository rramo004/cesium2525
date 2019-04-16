import { Injectable, ViewRef } from '@angular/core';
import { Track } from '../classes/track';
import * as ms from 'milsymbol';
import { ViewerService } from './viewer.service';

@Injectable({
  providedIn: 'root'
})
export class MilsymService {

  constructor() { }

  plotTracks(viewer: any, tracks: Track[]) {
    for (let i = 0; i < tracks.length; i++) {
      let sym = new ms.Symbol(
        tracks[i].type,
        {size: 25, 
         infoColor: "#FFFFFF",
         outlineWidth: 2,
        //quantity: tracks[i].id,
         staffComments: tracks[i].id ,
         additionalInformation: tracks[i].spd + ' KT',
         direction: tracks[i].cse,
        // type: "Machine Gun",
        //dtg: tracks[i].dtg,
        // location: "0900000.0E570306.0N"
        }
      );
      viewer.entities.add(
        {
          id: tracks[i].id,
          name: tracks[i].id,
          position : Cesium.Cartesian3.fromDegrees(tracks[i].lon, tracks[i].lat),
          billboard : {
            image : sym.asCanvas(), //Get the canvas for the billboard
            //pixelOffset : new Cesium.Cartesian2(-sym.markerAnchor.x, -sym.markerAnchor.y), // Symbol offset
            eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
            horizontalOrigin : Cesium.HorizontalOrigin.LEFT, // default
            verticalOrigin : Cesium.VerticalOrigin.TOP
          }
        }
      )
    }
  }

  clearTracks(viewer: any, tracks: Track[]) {
    //viewer.entities.removeAll();
    if (tracks != null) {
      for (let track of tracks) {
        viewer.entities.remove(viewer.entities.getById(track.id))
      }
    }
    
    
  }
}
