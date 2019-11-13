import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Track } from '../../classes/track';

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
  dataSource: MatTableDataSource<Track>;
  displayedColumns: string[] = ['name', 'pos', 'late', 'cat', 'thr', 'spd', 'cse'];
  color: String;
  constructor(private tmService: TrackmanagerService,
    private fmService: FiltermanagerService) {
      this.getUpdate();
  }

  ngOnInit() {
  }

  getUpdate() {
    setInterval(() => {
      this.tracks = this.tmService.getTracks();
      this.dataSource = new MatTableDataSource(this.tracks);
      //this.checkSpeed();
    }, 450);
  }

  getColor(track: any) {
    return track.color;
  }

  checkSpeed() {
    if (this.tracks != null) {
      for (let track of this.tracks) {
        if (track.spd >= this.fmService.getSpeed()) {
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
        else if (track.alt >= this.fmService.getAlt()) {
          if (!track.altAck) {
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
        else if (track.spdAck || track.altAck) {
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
