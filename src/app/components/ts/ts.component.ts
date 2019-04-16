import { Component, OnInit } from '@angular/core';
import { Track } from '../../classes/track';

import { XmljsonserviceService } from '../../services/xmljsonservice.service';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-ts',
  templateUrl: './ts.component.html',
  styleUrls: ['./ts.component.css']
})
export class TsComponent implements OnInit {

  show: boolean = false;
  tracks: Track[];
  displayedColumns: string[] = ['id', 'pos', 'late', 'cat', 'thr', 'spd', 'cse'];

  constructor(private xmljsonService: XmljsonserviceService, private wsService: WebsocketService) { }

  ngOnInit() {
    this.wsService.onNewMessage().subscribe( response => {
        if (response != null) {          
          this.tracks = [];
          this.xmljsonService.parseXML(response, this.tracks);
          this.show = true;
        }
        else {
         this.tracks = [];
         this.show = false;
        }
      }
    )
  }

}
