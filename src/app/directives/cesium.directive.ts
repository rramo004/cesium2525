import { Directive, OnInit, ElementRef } from '@angular/core';
import { XmljsonserviceService } from '../services/xmljsonservice.service';
import { MilsymService } from '../services/milsym.service';
import { Track } from '../classes/track'


@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit{

  public tracks: Track[];

  constructor(private el: ElementRef, private xmljsonService: XmljsonserviceService, private milsymService: MilsymService) { }

  ngOnInit() {
    const viewer = new Cesium.Viewer(this.el.nativeElement);
    this.tracks = [];
    this.xmljsonService.getXML('http://localhost:4200/assets/tracks.xml')
    .subscribe(response => {
       this.xmljsonService.parseXML(response, this.tracks);
       this.milsymService.plotTracks(viewer, this.tracks);
    });
  }
}
