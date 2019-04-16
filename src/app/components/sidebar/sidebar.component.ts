import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OverlaydialogComponent } from '../overlaydialog/overlaydialog.component'
import { ViewerService } from '../../services/viewer.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(public dialog: MatDialog, private viewerService: ViewerService ) { }
  
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
      console.log("Dialog output:", data);
      if (data != null && this.viewerService.viewer != null) {
          if (data.type == 'Ellipse') {
            this.createEllipse(data);
          }
          else {
            this.createRectangle(data);
          }
      }
    });

    
    
  }


  createEllipse(data: any) {
    let ellipse = this.viewerService.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(data.lon, data.lat),
      name : data.name,
      ellipse : {
          semiMinorAxis : data.minor,
          semiMajorAxis : data.major,
          height: data.height,
          fill: false,
          outline : true, // height must be set for outline to display
          outlineColor: Cesium.Color.WHITE,
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
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 10.0,
      }
  });
  }

}
