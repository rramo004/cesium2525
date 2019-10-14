import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OverlaydialogComponent } from '../overlaydialog/overlaydialog.component'
import { FilterdialogComponent } from '../filterdialog/filterdialog.component'
import { ViewerService } from '../../services/viewer.service';
import { FiltermanagerService } from 'src/app/services/filtermanager.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(public dialog: MatDialog, private viewerService: ViewerService, private filterManagerService: FiltermanagerService) { }


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
          else {
            this.createRectangle(data);
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
          speed: (this.filterManagerService.getSpeed() == null) ? 0 : this.filterManagerService.getSpeed()
        }
    }
    
    const dialogRef = this.dialog.open(FilterdialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log("Filter Dialog output:", data);
      if (data != null) {
        this.filterManagerService.setSpeed(data.speedFilter);
      }
        
    });
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
