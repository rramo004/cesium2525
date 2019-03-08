import { Directive, OnInit, ElementRef } from '@angular/core';
import { XmljsonserviceService } from '../services/xmljsonservice.service';
import * as ms from 'milsymbol';
import * as parse from 'xml2js';
import { Track } from '../classes/track'
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';


@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit{

  private xml: string;
  private tracks: {};
  private trackClassArr: Track[];

  constructor(private el: ElementRef, private xmljsonService: XmljsonserviceService) { }

  ngOnInit() {
    const viewer = new Cesium.Viewer(this.el.nativeElement);
    
    this.xmljsonService.getXML('http://localhost:4200/assets/tracks.xml')
    .subscribe(response => {
       this.xml = response;
       parse.parseString(this.xml, (err, results) => {
        this.tracks = results;
        
        this.trackClassArr = [];
        let trkTop: any[] = this.tracks['tracks'];
        let trks: any[] = trkTop['track'];
        for (let i = 0; i < trks.length; i++)
        {
          let trackClass: Track = new Track();
          let trk: any[] = trks[i];
          for (let index = 0; index < 1; index++) {
            trackClass.type = trk['type'][index];
            trackClass.lon = trk['lon'][index];
            trackClass.lat = trk['lat'][index];
          }
          
          this.trackClassArr.push(trackClass);
        }
        

        for (let i = 0; i < this.trackClassArr.length; i++) {

          let sym = new ms.Symbol(
            this.trackClassArr[i].type,
            {size: 25,
            quantity: "200",
            staffComments: "For Reinforcements",
            additionalInformation: "Added Support for JJ",
            direction: (750*360/6400),
            type: "Machine Gun",
            dtg: "2912398888111",
            location: "0900000.0E570306.0N"}
          );
          viewer.entities.add(
            {
              position : Cesium.Cartesian3.fromDegrees(this.trackClassArr[i].lon, this.trackClassArr[i].lat),
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
      });
    });
  }
}
