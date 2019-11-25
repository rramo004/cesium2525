import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewerService {

  private _viewer: any = null;
  private _pointCollection: any = null;

  constructor() {
    this._pointCollection = new Cesium.PointPrimitiveCollection;
  }

  get viewer() {
    return this._viewer;
  }

  set viewer(viewer: any) {
    this._viewer = viewer;
  }

  get pointCollection() {
    return this._pointCollection;
  }

}
