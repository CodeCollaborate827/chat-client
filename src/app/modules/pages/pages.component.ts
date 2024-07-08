import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../layout/services';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  isAsideActive$: Observable<boolean>;
  isAsideHover$: Observable<boolean>;

  constructor(
    private layoutService: LayoutService
  ) {
    this.isAsideActive$ = this.layoutService.asideActive$;
    this.isAsideHover$ = this.layoutService.asideHover$;
  }
}
