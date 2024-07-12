import { Component } from '@angular/core';
import Image from 'src/app/common/interface/image.interface';

@Component({
  selector: 'app-conversation-setting',
  templateUrl: './conversation-setting.component.html',
  styleUrls: ['./conversation-setting.component.scss']
})
export class ConversationSettingComponent {
  images : Image[] =  [
    { src: '../../../../../../assets/san-marco.jpg', alt: 'photo 1' },
    { src: '../../../../../../assets/san-marco.jpg', alt: 'photo 2' },
    { src: '../../../../../../assets/san-marco.jpg', alt: 'photo 3' },
    { src: '../../../../../../assets/san-marco.jpg', alt: 'photo 1' },
    { src: '../../../../../../assets/san-marco.jpg', alt: 'photo 2' },
    { src: '../../../../../../assets/san-marco.jpg', alt: 'photo 3' },
    { src: '../../../../../../assets/san-marco.jpg', alt: 'photo 1' },
    { src: '../../../../../../assets/san-marco.jpg', alt: 'photo 2' },
    { src: '../../../../../../assets/san-marco.jpg', alt: 'photo 3' },
    { src: '../../../../../../assets/san-marco.jpg', alt: 'photo 1' },
    { src: '../../../../../../assets/san-marco.jpg', alt: 'photo 2' },
    { src: '../../../../../../assets/san-marco.jpg', alt: 'photo 3' }
  ];

  visibleImages : Image [] = [];
  showLimit = 3; 

  constructor() {
    this.updateVisibleImages();
  }

  updateVisibleImages() {
    this.visibleImages = this.images.slice(0, this.showLimit);
  }

  showMore() {
    this.showLimit += 3;
    this.updateVisibleImages();
  }
}
