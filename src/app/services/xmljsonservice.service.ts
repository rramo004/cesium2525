import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as parse from 'xml2js';
import { Track } from '../classes/track'

@Injectable({
  providedIn: 'root'
})
export class XmljsonserviceService {
  xml: string;
  tracks: {};
  trackClassArr: Track[];


  constructor(private http: HttpClient) {}

  public getXML(url: string) {
    return this.http.get(url, { responseType: 'text' });
  }

  public convert() {
    parse.parseString(this.xml, (err, results) => {
      this.tracks = results;
    });
    this.storeTracks();
  }

  public storeXML(){
    this.getXML('http://localhost:4200/assets/tracks.xml')
    .subscribe(response => {
        this.xml = response;
        this.convert();
    });
  }

  
  public storeTracks() {
    this.trackClassArr = [];
    let trkTop: any[] = this.tracks['tracks'];
    let trks: any[] = trkTop['track'];
    for (let i = 0; i < trks.length; i++)
    {
      let trackClass: Track = new Track();
      let trk: any[] = trks[i];
      for (let index = 0; index < 1; index++) {
        trackClass.type = trk['type'][index];
        trackClass.lon = trk['lon'][index];
        trackClass.lat = trk['lat'][index];
      }
      
      this.trackClassArr.push(trackClass);
    }
  }

}
