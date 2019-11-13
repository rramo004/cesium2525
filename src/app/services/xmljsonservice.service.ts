import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as parse from 'xml2js';
import { Track } from '../classes/track'
import { interval, throwError } from 'rxjs';
import { TrackmanagerService } from './trackmanager.service';

import { catchError, map, timeInterval, switchMap } from 'rxjs/operators';
import { FiltermanagerService } from './filtermanager.service';


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

  constructor(private http: HttpClient,
    private tmService: TrackmanagerService,
    private fmService: FiltermanagerService) {
  }

  public get(url: string) {
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
    this.fmService.setSpeed(20);
    this.fmService.setAlt(10000);
    parse.parseString(response, (err, results) => {
      let trkTopTag: any[] = results['tracks'];
      let trks: any[] = trkTopTag['track'];
      for (let i = 0; i < trks.length; i++) {
        let track: Track = new Track();
        let trk: any[] = trks[i];
        for (let index = 0; index < 1; index++) {
          track.id = trk['uuid'][index];
          track.name = trk['id'][index];
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

          track.spdAck = false;
          if (track.thr == "HOS" || track.thr == "SUS") track.color = "red";
          else if (track.thr == "FRD" || track.thr == "AFD") track.color = "lightblue";
          else if (track.thr == "UNK" || track.thr == "PND") track.color = "yellow";
          else if (track.thr == "NEU") track.color = "lightgreen";
          else track.color = "black";

          track.alt = 0;
          track.altAck = false;

        }
        tracks.push(track);
      }
    });
  }

  parseJSON(response: any) {
    this.fmService.setSpeed(20);
    this.fmService.setAlt(10000);
    let trackJSON: any[] = JSON.parse(response)['Tracks'];
    if (trackJSON != undefined) {
      for (let i = 0; i < trackJSON.length; i++) {
        let track: Track = new Track();
        track.id = trackJSON[i]['uuid'];
        track.name = (trackJSON[i]['id'] == undefined) ? "UNKNOWN" : trackJSON[i]['id'];
        track.type = trackJSON[i]['type'];
        track.pos = trackJSON[i]['pos'];
        track.late = trackJSON[i]['late'];
        track.cat = trackJSON[i]['cat'];
        track.thr = trackJSON[i]['thr'];
        track.lon = trackJSON[i]['lon'];
        track.lat = trackJSON[i]['lat'];
        track.spd = (trackJSON[i]['spd'] < 0.0) ? 0.0 : trackJSON[i]['spd'];
        track.cse = (trackJSON[i]['cse'] < 0.0) ? 0.0 : trackJSON[i]['cse'];
        track.dtg = trackJSON[i]['dtg'];

        track.spdAck = false;
        if (track.thr == "HOS" || track.thr == "SUS") track.color = "red";
        else if (track.thr == "FRD" || track.thr == "AFD") track.color = "lightblue";
        else if (track.thr == "UNK" || track.thr == "PND") track.color = "yellow";
        else if (track.thr == "NEU") track.color = "lightgreen";
        else track.color = "black";

        track.alt = 0;
        track.altAck = false;


        this.tmService.pushTrack(track);
      }
    }
  }

  parseCreateTrackJSON(response: any): Track {
    this.fmService.setSpeed(20);
    this.fmService.setAlt(10000);
    let trackJSON = JSON.parse(response);

    let track: Track = new Track();
    track.id = trackJSON['uuid'];
    track.name = (trackJSON['id'] == undefined) ? "UNKNOWN" : trackJSON['id'];
    track.type = trackJSON['type'];
    track.pos = trackJSON['pos'];
    track.late = trackJSON['late'];
    track.cat = trackJSON['cat'];
    track.thr = trackJSON['thr'];
    track.lon = trackJSON['lon'];
    track.lat = trackJSON['lat'];
    track.spd = (trackJSON['spd'] < 0.0) ? 0.0 : trackJSON['spd'];
    track.cse = (trackJSON['cse'] < 0.0) ? 0.0 : trackJSON['cse'];
    track.dtg = trackJSON['dtg'];

    track.spdAck = false;
    if (track.thr == "HOS" || track.thr == "SUS") track.color = "red";
    else if (track.thr == "FRD" || track.thr == "AFD") track.color = "lightblue";
    else if (track.thr == "UNK" || track.thr == "PND") track.color = "yellow";
    else if (track.thr == "NEU") track.color = "lightgreen";
    else track.color = "black";

    track.alt = 0;
    track.altAck = false;

    return track;
  }

  parseRemoveTrackJSON(response: any): string {
    let trackJSON = JSON.parse(response);
    return trackJSON['uuid'];
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
