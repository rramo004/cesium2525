import { Injectable, ViewRef } from '@angular/core';
import { Track } from '../classes/track';
import * as ms from 'milsymbol';
import { ViewerService } from './viewer.service';
import { TrackmanagerService } from './trackmanager.service';

@Injectable({
  providedIn: 'root'
})
export class MilsymService {

  constructor(private viewerService: ViewerService, private tmService: TrackmanagerService) { }

  plotTracks() {
    for (let i = 0; i < this.tmService.tracks.length; i++) {
      let sym = new ms.Symbol(
        this.tmService.tracks[i].type,
        {size: 25, 
         infoColor: "#FFFFFF",
         outlineWidth: 2,
        //quantity: tracks[i].id,
         staffComments: this.tmService.tracks[i].id ,
         additionalInformation: this.tmService.tracks[i].spd + ' KT',
         direction: this.tmService.tracks[i].cse,
        // type: "Machine Gun",
        //dtg: tracks[i].dtg,
        // location: "0900000.0E570306.0N"
        }
      );
      
      //let desc = "TrackID: " + tracks[i].id + "\nLat: " + tracks[i].lat + "\nLon: " + tracks[i].lon + "\nSpeed: " + tracks[i].spd + "\nCourse: " + tracks[i].cse;
      
      let lat: string = (this.tmService.tracks[i].lat).toString();
      let lon: string = (this.tmService.tracks[i].lon).toString();
      let desc: string =  
          'Track Id: ' + this.tmService.tracks[i].id +
          '<br>Lat: ' + lat.slice(0,5) + '\u00B0' +
          '<br>Lon: ' + lon.slice(0,6) + '\u00B0'
      let symbol = this.viewerService.viewer.entities.add(
        {
          id: this.tmService.tracks[i].id,
          name: this.tmService.tracks[i].id,
          description: desc,
          position : Cesium.Cartesian3.fromDegrees(this.tmService.tracks[i].lon, this.tmService.tracks[i].lat),
          billboard : {
            image : sym.asCanvas(), //Get the canvas for the billboard
            //pixelOffset : new Cesium.Cartesian2(-sym.markerAnchor.x, -sym.markerAnchor.y), // Symbol offset
            eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
            horizontalOrigin : Cesium.HorizontalOrigin.LEFT, // default
            verticalOrigin : Cesium.VerticalOrigin.TOP
          },
          label: {
            show: false,
            showBackground : true,
            font : '16px monospace',
            horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
            verticalOrigin : Cesium.VerticalOrigin.TOP,
            pixelOffset : new Cesium.Cartesian2(15, 0),
          }
        }
      )

      // symbol.manualUpdate = true;
      // symbol.forceUpdate = true;


      // let tooltip = viewer.entities.add(
      //   {
      //     id: 'tooltip' + tracks[i].id,
      //     label : { 
      //         show: false,
      //         showBackground : true,
      //         font : '16px monospace',
      //         horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
      //         verticalOrigin : Cesium.VerticalOrigin.TOP,
      //         pixelOffset : new Cesium.Cartesian2(15, 0),
              
      //     }
      //   }
      // )

      // new Cesium.ScreenSpaceEventHandler(this.viewerService.viewer.scene.canvas)
      // .setInputAction(function(movement) {
      //   let pickedObject = this.viewerService.viewer.scene.pick(movement.endPosition);
      //   if (Cesium.defined(pickedObject) && (pickedObject.id === symbol)) {
      //     let lat: string = (this.tmService.tracks[i].lat).toString();
      //     let lon: string = (this.tmService.tracks[i].lon).toString();
      //     symbol.label.show =  true,
      //     symbol.label.text = 
      //         'Track Id: ' + this.tmService.tracks[i].id +
      //         '\nLat: ' + lat.slice(0,5) + '\u00B0' +
      //         '\nLon: ' + lon.slice(0,6) + '\u00B0'
      //   }
      //   else {
      //     symbol.label.show = false;
      //   }
       
      // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }
  }

  clearTracks() {
   // viewer.entities.removeAll();
     if (this.tmService.tracks != null) {
      for (let track of this.tmService.tracks) {
        this.viewerService.viewer.entities.remove(this.viewerService.viewer.entities.getById(track.id))
        //viewer.entities.remove(viewer.entities.getById('tooltip'+track.id))
      }
     }
    
    
  }
}
