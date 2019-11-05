import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OverlaydialogComponent } from '../overlaydialog/overlaydialog.component'
import { FilterdialogComponent } from '../filterdialog/filterdialog.component'
import { ViewerService } from '../../services/viewer.service';
import { FiltermanagerService } from 'src/app/services/filtermanager.service';
import { TrackmanagerService } from 'src/app/services/trackmanager.service';
import { LayerdialogComponent } from '../layerdialog/layerdialog.component';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  trackCount: number = 0;
  connected: boolean = false;
  layerEnabled: boolean = false;

  constructor(public dialog: MatDialog, 
              private viewerService: ViewerService, 
              private filterManagerService: FiltermanagerService,
              private wsService: WebsocketService,
              private tmManagerService: TrackmanagerService) { this.updateTrack() }


  updateTrack(): void {
    setInterval(() => {
      this.trackCount = this.tmManagerService.tracks.length;
      this.connected = this.wsService.connected;
    }, 1000);
  }


  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = {
        id: 1,
        title: 'Overlay Options'
    };
    
    const dialogRef = this.dialog.open(OverlaydialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log("Overlay Dialog output:", data);
      if (data != null && this.viewerService.viewer != null) {
          if (data.type == 'Ellipse') {
            this.createEllipse(data);
          }
          else if(data.type == 'Rectangle') {
            this.createRectangle(data);
          }
          else if (data.type == 'Corridor') {
            this.createCorridor(data);
          }
      }
    });
  }

  openFilterDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = {
        id: 1,
        title: 'Filter Options',
        filter: {
          speed: (this.filterManagerService.getSpeed() == null) ? 0 : this.filterManagerService.getSpeed(),
          alt: (this.filterManagerService.getAlt() == null) ? 0 : this.filterManagerService.getAlt()
        }
    }
    
    const dialogRef = this.dialog.open(FilterdialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {
        this.filterManagerService.setSpeed(data.speedFilter);
        this.filterManagerService.setAlt(data.altFilter);

        for (let track of this.tmManagerService.getTracks() ) {
          if (track.spd >= this.filterManagerService.getSpeed()) {
            track.spdAck = false;
          }

          if (track.alt >= this.filterManagerService.getAlt()) {
            track.altAck = false;
          }
        }
      }
        
    });
  }

  openLayerDialog() : void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = {
        id: 1,
        title: 'Layer Options'
    }
    
    const dialogRef = this.dialog.open(LayerdialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.layerEnabled = false;
      for (let i = 1; i < this.viewerService.viewer.imageryLayers.length; i++ ) {
          this.layerEnabled = this.layerEnabled || this.viewerService.viewer.imageryLayers.get(i).show;
      }
    });
  }

  ackAlerts() {
    for (let track of this.tmManagerService.getTracks() ) {
      if (!track.spdAck) {
        track.spdAck = true;
        this.viewerService.viewer.entities.getById(track.id).show = true;
        if (track.thr == "HOS" || track.thr == "SUS") track.color = "red";
        else if (track.thr == "FRD" || track.thr == "AFD") track.color = "lightblue";
        else if (track.thr == "UNK" || track.thr == "PND") track.color = "yellow";
        else if (track.thr == "NEU") track.color = "lightgreen";
      }
      else if (!track.altAck) {
        track.altAck = true;
        this.viewerService.viewer.entities.getById(track.id).show = true;
        if (track.thr == "HOS" || track.thr == "SUS") track.color = "red";
        else if (track.thr == "FRD" || track.thr == "AFD") track.color = "lightblue";
        else if (track.thr == "UNK" || track.thr == "PND") track.color = "yellow";
        else if (track.thr == "NEU") track.color = "lightgreen";
      }
    }
  }

  createEllipse(data: any) {
    let ellipse = this.viewerService.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(data.lon, data.lat),
      name : data.name,
      // ellipse : {
      //     semiMinorAxis : data.minor,
      //     semiMajorAxis : data.major,
      //     height: data.height,
      //     fill: false,
      //     outline : true, // height must be set for outline to display
      //     outlineColor: this.getColor(data.color),
      //     outlineWidth: 10.0,

      // }

      cylinder : {
        length : 300000.0,
        topRadius : data.minor,
        bottomRadius : data.major,
        fill: false,
        outline : true, // height must be set for outline to display
        outlineColor: this.getColor(data.color),
        outlineWidth: 10.0,
      }
    });
  }

  createRectangle(data: any) {
    let rectangle = this.viewerService.viewer.entities.add({
      name :  data.name,
      rectangle : {
          coordinates : Cesium.Rectangle.fromDegrees(data.coord1, data.coord2, data.coord3, data.coord4),
          height : data.heightR,
          fill: false,
          outline : true, // height must be set for outline to display
          outlineColor: this.getColor(data.color),
          outlineWidth: 10.0,
      }
    });
  }

  computeCircle(radius) {
    let positions = [];
    for (var i = 0; i < 360; i++) {
        var radians = Cesium.Math.toRadians(i);
        positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
    }
    return positions;
  } 

  createCorridor(data: any) {
    let corridor = this.viewerService.viewer.entities.add({
      polylineVolume : {
          positions : Cesium.Cartesian3.fromDegreesArray([data.startLon, data.startLat,
                                                          data.endLon, data.endLat]),
          shape : this.computeCircle(250.0),
          material : this.getColor(data.color)
      }
    });
  }


  getColor(colorStr): any {
    if (colorStr == "blue") {
      return Cesium.Color.BLUE;
    }
    else if (colorStr == "red") {
      return Cesium.Color.RED;
    }
    else if (colorStr == "yellow") {
      return Cesium.Color.YELLOW;
    }
    else if (colorStr == "green") {
      return Cesium.Color.GREEN;
    }
    else if (colorStr == "white") {
      return Cesium.Color.WHITE;
    }
    else {
      return Cesium.Color.BLACK;
    }
  }

}
