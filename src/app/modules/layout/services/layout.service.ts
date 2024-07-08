import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LayoutService { 
  private _asideHover$ = new BehaviorSubject<boolean>(false);
  private _asideActive$ = new BehaviorSubject<boolean>(false);

  get asideHover$(): Observable<boolean> {
    return this._asideHover$.asObservable();
  }

  get asideActive$(): Observable<boolean> {
    return this._asideActive$.asObservable();
  }

  toggleAsideHover(value: boolean) { 
    this._asideHover$.next(value);
  }

  toggleAsideActive(value: boolean) {
    this._asideActive$.next(value);
  }
}