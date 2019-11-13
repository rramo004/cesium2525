import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { XmljsonserviceService } from '../services/xmljsonservice.service';
import { MilsymService } from '../services/milsym.service';
import { WebsocketService } from '../services/websocket.service';
import { ViewerService } from '../services/viewer.service';
import { TrackmanagerService } from '../services/trackmanager.service';
import { ConditionalsService } from '../services/conditionalservice.service';
import { Track } from '../classes/track';


@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit {

  constructor(private el: ElementRef,
    private xmljsonService: XmljsonserviceService,
    private milsymService: MilsymService,
    private wsService: WebsocketService,
    public viewerService: ViewerService,
    public tmService: TrackmanagerService,
    private conditionalServer: ConditionalsService) { }

  ngOnInit() {
    if (this.viewerService.viewer == null) {

      let providerViewModels = [];
      let tarrainViewModels = [];


      providerViewModels.push(new Cesium.ProviderViewModel({
        name: 'Bing',
        iconUrl: Cesium.buildModuleUrl("Widgets/Images/ImageryProviders/bingAerial.png"),
        creationFunction: function () {
          return new Cesium.BingMapsImageryProvider({
            url: 'https://dev.virtualearth.net',
            key: 'Ak9AXTRd5fXJWPQ3mxanQ4O0LH83H0G2BvMgG0HpYU3IiJ8dBsYiDg8kKmIV8SNy',
            mapStyle: Cesium.BingMapsStyle.AERIAL
          });
        }
      }));

      providerViewModels.push(new Cesium.ProviderViewModel({
        name: 'Geoserver',
        iconUrl: Cesium.buildModuleUrl("Widgets/Images/ImageryProviders/naturalEarthII.png"),
        creationFunction: function () {
          return new Cesium.WebMapServiceImageryProvider({
            url: 'http://localhost:8080/geoserver/wms',
            layers: 'NaturalEarth:NE1_50M_SR_W',
            parameters: { transparent: true, format: 'image/png', tiled: true }
          });
        }
      }));

      this.viewerService.viewer = new Cesium.Viewer(this.el.nativeElement, {
        imageryProviderViewModels: providerViewModels,
        terrainProviderViewModels: tarrainViewModels,
        geocoder: false,
        timeline: false,
        fullscreenButton: false,
        animation: false,
        sceneMode: Cesium.SceneMode.SCENE2D
      });


      let newProvider1 = new Cesium.WebMapServiceImageryProvider({
        url: 'http://localhost:8080/geoserver/wms',
        layers: 'topp:states',
        parameters: { transparent: true, format: 'image/png', tiled: true }
      });

      let newProvider2 = new Cesium.WebMapServiceImageryProvider({
        url: 'http://localhost:8080/geoserver/wms',
        layers: 'tiger:tiger_roads',
        parameters: { transparent: true, format: 'image/png', tiled: true }
      });



      this.viewerService.viewer.imageryLayers.addImageryProvider(newProvider1, 1);
      this.viewerService.viewer.imageryLayers.addImageryProvider(newProvider2, 2);
      for (let i = 1; i < this.viewerService.viewer.imageryLayers.length; i++) {
        this.viewerService.viewer.imageryLayers.get(i).show = false;
      }




      this.wsService.onStartupMessage().subscribe(response => {
        //console.log(response);
        if (response != null) {
          this.milsymService.clearTracks();
          this.tmService.clearTracks();

          this.xmljsonService.parseJSON(response);
          this.milsymService.plotTracks();
          this.milsymService.trackOverlayFilter(this.tmService.getFilterEnabled());
        }
        else {
          this.milsymService.clearTracks();
          this.tmService.clearTracks();
        }
      });

      this.wsService.onCreateTrackMessage().subscribe(response => {
        //console.log(response);
        if (response != null) {
          let track: Track = this.xmljsonService.parseCreateTrackJSON(response);
          this.tmService.pushTrack(track);
          this.milsymService.plotTrack(track);
          this.milsymService.trackOverlayFilter(this.tmService.getFilterEnabled());
        }
      });

      this.wsService.onRemoveTrackMessage().subscribe(response => {
        //console.log(response);
        if (response != null) {
          let id: string = this.xmljsonService.parseRemoveTrackJSON(response);
          this.tmService.removeTrackById(id);
          this.milsymService.removeTrack(id);
          this.milsymService.trackOverlayFilter(this.tmService.getFilterEnabled());
        }
      });

      this.wsService.onUpdateTrackMessage().subscribe(response => {
        //console.log(response);
        if (response != null) {
          let track: Track = this.xmljsonService.parseCreateTrackJSON(response);
          if (this.tmService.containsTrack(track)) {
            this.tmService.pushTrack(track);
            if (this.milsymService.containsTrack(track)) {
              this.milsymService.modifyTrack(track);
            }
          }
          else {
            this.tmService.pushTrack(track);
            this.milsymService.plotTrack(track);
          }
          this.milsymService.trackOverlayFilter(this.tmService.getFilterEnabled());
        }
      });


      var labelEntity = this.viewerService.viewer.entities.add({
        label: {
          show: false,
          showBackground: true,
          font: '16px monospace',
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          verticalOrigin: Cesium.VerticalOrigin.TOP,
          pixelOffset: new Cesium.Cartesian2(15, 0),
        }
      });

      let handler = new Cesium.ScreenSpaceEventHandler(this.viewerService.viewer.scene.canvas)
      handler.setInputAction((movement) => {

        let foundPosition = false;

        let picked = this.viewerService.viewer.scene.pick(movement.endPosition);
        if ((Cesium.defined(picked)) && (this.tmService.getTrackById(picked.id.id) != null)) {
          let track = this.tmService.getTrackById(picked.id.id);
          let lat: string = (track.lat).toString();
          let lon: string = (track.lon).toString();
          labelEntity.label.text = 'Track Id: ' + track.name +
            '\nLat: ' + lat.slice(0, 5) + '\u00B0' +
            '\nLon: ' + lon.slice(0, 6) + '\u00B0';
          labelEntity.position = this.viewerService.viewer.entities.getById(track.id).position.getValue(this.viewerService.viewer.clock.currentTime);
          labelEntity.label.show = true;

          foundPosition = true;
        }

        if (!foundPosition) {
          labelEntity.label.show = false;
        }

      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);



    }





    //this.recheckData();

    //Socket IO works!
    //this.wsService.sendMessage();



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
