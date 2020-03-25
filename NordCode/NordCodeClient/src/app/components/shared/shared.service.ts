import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  UpdateCount(count) {
    return count+1;
  }
  constructor() { }
}
