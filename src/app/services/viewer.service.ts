import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewerService {

  private _viewer: any = null;

  constructor() { }

  get viewer() {
    return this._viewer;
  }

  set viewer(viewer: any) {
    this._viewer = viewer;
  }

}
