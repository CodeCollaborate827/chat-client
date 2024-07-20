import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @ViewChild('zoomedImage') zoomedImageModal!: TemplateRef<any>;
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() width?: number;
  @Input() height?: number;
  @Input() classes?: { [key: string]: boolean };

  constructor(
    private dialog: MatDialog
  ) { 

  }
  onZoomIn() { 
    this.dialog.open(this.zoomedImageModal, {
      height: "auto",
      width: "auto",
      maxWidth: "100vw",
      maxHeight: "100vh"
    })
  }
}
