import { Injectable } from '@angular/core';
import { Filter } from '../classes/filters';

@Injectable({
  providedIn: 'root'
})
export class FiltermanagerService {

  filters: Filter;
  constructor() {
    this.filters = new Filter();
  }
  
  getFilters(): Filter {
    return this.filters;
  }

  getSpeed(): number {
    return this.filters.speed;
  }

  setSpeed(speed: number) {
    this.filters.speed = speed;
  }
}
