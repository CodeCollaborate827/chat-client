import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent {
  @Input() avatar: string = '../../../../../../assets/san-marco.jpg';
  @Input() isOnline: boolean = true;

  constructor() {}
}
