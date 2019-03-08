import { Directive, OnInit, ElementRef } from '@angular/core';
import { XmljsonserviceService } from '../services/xmljsonservice.service';
import * as ms from 'milsymbol';
import * as parse from 'xml2js';
import { Track } from '../classes/track'


@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit{

  private tracks: Track[];

  constructor(private el: ElementRef, private xmljsonService: XmljsonserviceService) { }

  ngOnInit() {
    const viewer = new Cesium.Viewer(this.el.nativeElement);
    this.tracks = [];
    this.xmljsonService.getXML('http://localhost:4200/assets/tracks.xml')
    .subscribe(response => {
       this.parseXML(response);
       this.plotTracks(viewer);
    });
  }

  parseXML(response: string) {
    parse.parseString(response, (err, results) => {
      let trkTopTag: any[] = results['tracks'];
      let trks: any[] = trkTopTag['track'];
      for (let i = 0; i < trks.length; i++)
      {
        let track: Track = new Track();
        let trk: any[] = trks[i];
        for (let index = 0; index < 1; index++) {
          track.type = trk['type'][index];
          track.lon = trk['lon'][index];
          track.lat = trk['lat'][index];
        }
        this.tracks.push(track);
      }
    });
  }

  plotTracks(viewer: any) {
    for (let i = 0; i < this.tracks.length; i++) {
      let sym = new ms.Symbol(
        this.tracks[i].type,
        {size: 25}
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
          position : Cesium.Cartesian3.fromDegrees(this.tracks[i].lon, this.tracks[i].lat),
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
