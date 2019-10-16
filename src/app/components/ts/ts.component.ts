import { Component, OnInit } from '@angular/core';
import { Track } from '../../classes/track';

import { XmljsonserviceService } from '../../services/xmljsonservice.service';
import { WebsocketService } from '../../services/websocket.service';
import { TrackmanagerService } from 'src/app/services/trackmanager.service';
import { FiltermanagerService } from 'src/app/services/filtermanager.service';
@Component({
  selector: 'app-ts',
  templateUrl: './ts.component.html',
  styleUrls: ['./ts.component.css']
})
export class TsComponent implements OnInit {

  show: boolean = false;
  tracks: Track[];
  displayedColumns: string[] = ['id', 'pos', 'late', 'cat', 'thr', 'spd', 'cse'];
  color: String;
  constructor(private xmljsonService: XmljsonserviceService, 
              private wsService: WebsocketService,
              private tmService: TrackmanagerService,
              private fmService: FiltermanagerService) {
                this.getUpdate();
              }

  ngOnInit() {
    
    // this.wsService.onNewMessage().subscribe( response => {
    //     if (response != null) {          
    //       this.tracks = [];
    //       this.xmljsonService.parseXML(response, this.tracks);
    //       this.show = true;
    //     }
    //     else {
    //      this.tracks = [];
    //      this.show = false;
    //     }
    //   }
    // )
  }

  getUpdate() {
    setInterval(() => {
      this.tracks = this.tmService.getTracks();
      this.checkSpeed();
    }, 450);
  }

  getColor(track: any) {
      return track.color;
  }

  checkSpeed() {
    if (this.tracks != null) {
      for (let track of this.tracks) {
        if (track.spd >= this.fmService.getSpeed() ) {
          if (!track.spdAck) {
            if (track.color != "#38404c") {
              track.color = "#38404c";
            } else {
              if (track.thr == "HOS" || track.thr == "SUS") track.color = "red";
              else if (track.thr == "FRD" || track.thr == "AFD") track.color = "lightblue";
              else if (track.thr == "UNK" || track.thr == "PND") track.color = "yellow";
              else if (track.thr == "NEU") track.color = "lightgreen";
            }
          }
        }
        else if (track.spdAck) {
          if (track.thr == "HOS" || track.thr == "SUS") track.color = "red";
          else if (track.thr == "FRD" || track.thr == "AFD") track.color = "lightblue";
          else if (track.thr == "UNK" || track.thr == "PND") track.color = "yellow";
          else if (track.thr == "NEU") track.color = "lightgreen";
        }
        else {
          if (track.thr == "HOS" || track.thr == "SUS") track.color = "red";
          else if (track.thr == "FRD" || track.thr == "AFD") track.color = "lightblue";
          else if (track.thr == "UNK" || track.thr == "PND") track.color = "yellow";
          else if (track.thr == "NEU") track.color = "lightgreen";
        }
      }
    }
  }

}
