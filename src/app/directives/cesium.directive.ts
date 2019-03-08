import { Directive, OnInit, ElementRef } from '@angular/core';
import * as ms from 'milsymbol';
import * as parse from 'xml2js';
import * as convert from 'xml-js';

@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit{

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const viewer = new Cesium.Viewer(this.el.nativeElement);
      let sym = new ms.Symbol('SUSP--------',{size:25});
      viewer.entities.add(
      {
        position : Cesium.Cartesian3.fromDegrees(-75, 40),
        billboard : {
          image : sym.asCanvas(), //Get the canvas for the billboard
          //pixelOffset : new Cesium.Cartesian2(-sym.markerAnchor.x, -sym.markerAnchor.y), // Symbol offset
          eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
          horizontalOrigin : Cesium.HorizontalOrigin.LEFT, // default
          verticalOrigin : Cesium.VerticalOrigin.TOP
        }
      });

      let sym2 = new ms.Symbol('sfgpewrh--mt',{
        size:25,
        quantity: "200",
        staffComments: "For Reinforcements",
        additionalInformation: "Added Support for JJ",
        direction: (750*360/6400),
        type: "Machine Gun",
        dtg: "2912398888111",
        location: "0900000.0E570306.0N"
      });
      viewer.entities.add(
        {
          position : Cesium.Cartesian3.fromDegrees(-77, 28),
          billboard : {
            image : sym2.asCanvas(), //Get the canvas for the billboard
            //pixelOffset : new Cesium.Cartesian2(-sym.markerAnchor.x, -sym.markerAnchor.y), // Symbol offset
            eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
            horizontalOrigin : Cesium.HorizontalOrigin.LEFT, // default
            verticalOrigin : Cesium.VerticalOrigin.TOP
          }
        }
      );

      let xml = "<root>Hello xml2js!</root>";
      parse.parseString(xml, (err, results) => {
          console.log(results);
      });
      

      let xml2 =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<note importance="high" logged="true">' +
      '    <title>Happy</title>' +
      '    <todo>Work</todo>' +
      '    <todo>Play</todo>' +
      '</note>';
      let result1 = convert.xml2json(xml2, {compact: true, spaces: 4});
      let result2 = convert.xml2json(xml2, {compact: false, spaces: 4});
      console.log(result1, '\n', result2);
  }

}
