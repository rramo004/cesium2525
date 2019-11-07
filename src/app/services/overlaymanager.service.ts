import { Injectable } from '@angular/core';
import { Shape } from '../classes/shape';

@Injectable({
  providedIn: 'root'
})
export class OverlaymanagerService {

  private _overlays: Shape[];

  constructor() { 
    this._overlays = [];
  }

  get overlays() {
    return this._overlays;
  }

  pushOverlay(overlay: Shape) {
    this._overlays.push(overlay);
  }

  updateOverlays(overlays: Shape[]) {
    this._overlays = overlays;
  }

}
