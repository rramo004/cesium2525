import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as parse from 'xml2js';
import { Track } from '../classes/track'


@Injectable({
  providedIn: 'root'
})
export class XmljsonserviceService {


  constructor(private http: HttpClient) {
  }

  public getXML(url: string) {
    return this.http.get(url, { responseType: 'text' });
  }

  parseXML(response: string, tracks: Track[]) {
    parse.parseString(response, (err, results) => {
      let trkTopTag: any[] = results['tracks'];
      let trks: any[] = trkTopTag['track'];
      for (let i = 0; i < trks.length; i++)
      {
        let track: Track = new Track();
        let trk: any[] = trks[i];
        for (let index = 0; index < 1; index++) {
          track.type = trk['type'][index];
          track.lon = trk['lon'][index];
          track.lat = trk['lat'][index];
        }
        tracks.push(track);
      }
    });
  }
}
