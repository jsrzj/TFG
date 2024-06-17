import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavToggleService {
  private toggleSubject = new Subject<void>();

  constructor() { }

  toggleSidenav() {
    this.toggleSubject.next();
  }

  getToggleSubject() {
    return this.toggleSubject.asObservable();
  }
}
