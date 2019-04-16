import { Directive, OnInit, ElementRef, Input} from '@angular/core';
import { XmljsonserviceService } from '../services/xmljsonservice.service';
import { MilsymService } from '../services/milsym.service';
import { Track } from '../classes/track'
import { WebsocketService } from '../services/websocket.service';
import { Observable } from 'rxjs';
import { ViewerService } from '../services/viewer.service';


@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit{

  tracks: Track[] = [];
  results: Observable<any>;
  

  constructor(private el: ElementRef, 
              private xmljsonService: XmljsonserviceService, 
              private milsymService: MilsymService, 
              private wsService: WebsocketService,
              private viewerService: ViewerService) {}

  ngOnInit() {
    if (this.viewerService.viewer == null)
      this.viewerService.viewer = new Cesium.Viewer(this.el.nativeElement, {timeline: false, fullscreenButton: false, animation: false, sceneMode : Cesium.SceneMode.SCENE2D});
  
    //this.recheckData();

    //Socket IO works!
    //this.wsService.sendMessage();

    this.wsService.onNewMessage().subscribe( response => {
      
        if (response != null) {
          this.milsymService.clearTracks(this.viewerService.viewer, this.tracks);
          this.tracks = [];
          
          //let results = response['content'];
          this.xmljsonService.parseXML(response, this.tracks);
          this.milsymService.plotTracks(this.viewerService.viewer, this.tracks); 
        }
        else {
          this.milsymService.clearTracks(this.viewerService.viewer, this.tracks);
          this.tracks = [];
        }
      }
    )

    // if (this.viewerService.viewer != null) {
    //   let greenCircle = this.viewerService.viewer.entities.add({
    //     position: Cesium.Cartesian3.fromDegrees(-111.0, 40.0, 150000.0),
    //     name : 'Green circle at height with outline',
    //     ellipse : {
    //         semiMinorAxis : 300000.0,
    //         semiMajorAxis : 300000.0,
    //         height: 1.0,
    //         material : Cesium.Color.GREEN.withAlpha(0.1),
    //         outline : true // height must be set for outline to display
    //     }
    // });
    // }
    

    //Regular HTTP works!
 
    
  //   const subscription = this.xmljsonService.get('http://localhost:8080/tracking')
  //  // const subscription = this.xmljsonService.get('http://127.0.0.1:4567')
  //   .subscribe (response => {
  //         console.log("Server has new data!");
  //         this.tracks = [];
  //         let results = response['content'];
  //         this.xmljsonService.parseXML(results, this.tracks);
  //         this.milsymService.plotTracks(this.viewer, this.tracks);   
  //     }
  //   )

    // this.xmljsonService.getXML('http://localhost:4200/assets/tracks.xml')
    // .subscribe(response => {
    //    this.xmljsonService.parseXML(response, this.tracks);
    //    this.milsymService.plotTracks(viewer, this.tracks);
    // });
  }

  // recheckData() {
  //   setInterval(() => {
  //     this.tracks = [];
  //     const subscription = this.xmljsonService.get('http://127.0.0.1:4567')
  //     .subscribe (response => {
  //           console.log("poll server to check for new data")
  //           let results = response['content'];
  //           this.xmljsonService.parseXML(results, this.tracks);
  //           this.milsymService.plotTracks(this.viewer, this.tracks);   
  //       }
  //     )
  //     //subscription.unsubscribe();
      
  //   }, 10000);
    
  // }
}
