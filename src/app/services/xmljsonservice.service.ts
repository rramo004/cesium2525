import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as parse from 'xml2js';
import { Track } from '../classes/track'
import { interval, throwError  } from 'rxjs';

import { catchError, map, timeInterval, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class XmljsonserviceService {

  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
  }

  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict), 
  };

  constructor(private http: HttpClient) {
  }

  public get(url: string)  {
    let results = interval(1000).pipe(
      switchMap(() => this.http.get(url, this.requestOptions)),
      catchError(this.handlerErrror)
    )
    return results;//, { responseType: 'text' });
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
          track.id = trk['id'][index];
          track.type = trk['type'][index];
          track.pos = trk['pos'][index];
          track.late = trk['late'][index];
          track.cat = trk['cat'][index];
          track.thr = trk['thr'][index];
          track.lon = trk['lon'][index];
          track.lat = trk['lat'][index];
          track.spd = (trk['spd'][index] < 0.0) ? 0.0 : trk['spd'][index];
          track.cse = (trk['cse'][index] < 0.0) ? 0.0 : trk['cse'][index];
          track.dtg = trk['dtg'][index];
        }
        tracks.push(track);
      }
    });
  }

  private handlerErrror(error: Response) {
    if (error.status === 404) 
      return throwError(error => {
        console.log(error.json())
      });
    if (error.status === 400)
    return throwError(error => {
      console.log(error.json())
    });
  
    return throwError(error => {
      console.log(error.json())
    });
}
}
