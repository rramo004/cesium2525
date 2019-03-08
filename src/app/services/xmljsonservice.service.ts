import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class XmljsonserviceService {

  constructor(private http: HttpClient) {
  }

  public getXML(url: string) {
    return this.http.get(url, { responseType: 'text' });
  }
}
