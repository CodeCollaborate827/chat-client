import { Component } from '@angular/core';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent {
  messages = Array.from({ length: 20 }).map((_, i) => `Message #${i}`);

  onScroll(): void {
    this.loadMoreMessages();
  }

  loadMoreMessages(): void {
    const newMessages = [];

    for (let i = 0; i < 10; i++) {
      const newMessage = `Message #${this.messages.length + i}`;
      newMessages.push(newMessage);
    }

    this.messages = [...this.messages, ...newMessages];
  }
}
