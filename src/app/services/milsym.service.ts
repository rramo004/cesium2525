import { Injectable } from '@angular/core';
import { Track } from '../classes/track';
import * as ms from 'milsymbol';

@Injectable({
  providedIn: 'root'
})
export class MilsymService {

  constructor() { }

  plotTracks(viewer: any, tracks: Track[]) {
    for (let i = 0; i < tracks.length; i++) {
      let sym = new ms.Symbol(
        tracks[i].type,
        {size: 25, quantity: "Track "+(i+1), infoColor: "#FFFFFF"}
        // quantity: "200",
        // staffComments: "For Reinforcements",
        // additionalInformation: "Added Support for JJ",
        // direction: (750*360/6400),
        // type: "Machine Gun",
        // dtg: "2912398888111",
        // location: "0900000.0E570306.0N"}
      );
      viewer.entities.add(
        {
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
}
