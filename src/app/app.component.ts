import { Component, ElementRef } from '@angular/core';
// import customParseFormat from 'dayjs/plugin/customParseFormat'; 
import * as dayjs from 'dayjs';
import { config } from 'src/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chat';

  constructor(
    private elementRef: ElementRef
  ) {
    // dayjs.extend(customParseFormat)
    this.setStyles();
  }

  private setStyles(): void {
    const themeVariables: any = config.theme;
    Object.keys(themeVariables).forEach((key) => { 
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty(key, themeVariables[key]);
    })
  }
}
