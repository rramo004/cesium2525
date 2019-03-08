import { Directive, OnInit, ElementRef } from '@angular/core';
import * as ms from 'milsymbol';
import { XmljsonserviceService } from '../services/xmljsonservice.service';

@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit{

  constructor(private el: ElementRef, private xmljsonService: XmljsonserviceService) { }

  ngOnInit() {
    const viewer = new Cesium.Viewer(this.el.nativeElement);
      //let sym = new ms.Symbol('SUSP--------',{size:25});
      // for (let i = 0; i < 10; i++) {

      //   viewer.entities.add(
      //     {
      //       position : Cesium.Cartesian3.fromDegrees(120.9605, 23.6978),
      //       billboard : {
      //         image : sym.asCanvas(), //Get the canvas for the billboard
      //         //pixelOffset : new Cesium.Cartesian2(-sym.markerAnchor.x, -sym.markerAnchor.y), // Symbol offset
      //         eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
      //         horizontalOrigin : Cesium.HorizontalOrigin.LEFT, // default
      //         verticalOrigin : Cesium.VerticalOrigin.TOP
      //       }
      //     });
      // }
      
      // let sym2 = new ms.Symbol('sfgpewrh--mt',{
      //   size:25,
      //   quantity: "200",
      //   staffComments: "For Reinforcements",
      //   additionalInformation: "Added Support for JJ",
      //   direction: (750*360/6400),
      //   type: "Machine Gun",
      //   dtg: "2912398888111",
      //   location: "0900000.0E570306.0N"
      // });
      // viewer.entities.add(
      //   {
      //     position : Cesium.Cartesian3.fromDegrees(120.9605, 23.6978),
      //     billboard : {
      //       image : sym2.asCanvas(), //Get the canvas for the billboard
      //       //pixelOffset : new Cesium.Cartesian2(-sym.markerAnchor.x, -sym.markerAnchor.y), // Symbol offset
      //       eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
      //       horizontalOrigin : Cesium.HorizontalOrigin.LEFT, // default
      //       verticalOrigin : Cesium.VerticalOrigin.TOP
      //     }
      //   }
      // );

    this.xmljsonService.storeXML();
  }

}
