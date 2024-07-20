import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() messages: any = [];
  @Input() message: any = {};
  isMessageOptionsHidden: boolean = true;

  constructor() {

  }

  toggleMessageOptions(hidden: boolean) {
    this.isMessageOptionsHidden = hidden ? true : false;
  }
    
  getMessageOrder(message: any): string {
    let order = ''
    // if there is no message
    if (this.messages.length === 0) {
      order = '';
      return order;
    }
    // if there is only one message 
    if (this.messages.length === 1) {
      order = 'single';
      return order;
    }
    const messageIndex = this.messages.indexOf(message);

    // if the message is the first message
    if (messageIndex == 0) {
      // if the message and the next message are of the same user
      const nextMessage = this.messages[messageIndex + 1]
      if (message.user?.id == nextMessage.user?.id) {
        if (message.repliedTo && nextMessage.repliedTo) {
          return 'single';
        } else if (message.repliedTo && !nextMessage.repliedTo || !message.repliedTo) {
          return 'first';
        }
      }
      // if the message and the next message are of different user
      else {
        return 'single';
      }
      // if the message is the last message
    } else if (messageIndex == this.messages.length - 1) {
      const previousMessage = this.messages[messageIndex - 1];
      // if the message and the previous message are of the same user
      if (message.user?.id == previousMessage.user?.id) {
        if (message.repliedTo && !previousMessage.repliedTo || message.repliedTo && previousMessage.repliedTo ) {
          return 'single';
        } else if (!message.repliedTo) {
          return 'last';
        }
        // if the message and the previous message are of different user
      } else {
        return 'single';
      }
      // if the message is in the middle
    } else {
      const nextMessage = this.messages[messageIndex + 1];
      const previousMessage = this.messages[messageIndex - 1];
      // if the message's user is different from both previous and next message
      if (message.user?.id !== previousMessage.user?.id && message.user?.id !== nextMessage.user?.id) {
        return 'single';
      }
      else if (message.user?.id !== previousMessage.user?.id && message.user?.id == nextMessage.user?.id) {
        if ((!message.repliedTo && nextMessage.repliedTo) || (message.repliedTo && nextMessage.repliedTo)) {
          return 'single';
        } else if ((message.repliedTo && !nextMessage.repliedTo) || (!message.repliedTo && !nextMessage.repliedTo)) {
          return 'first';
        }
      } else if (message.user?.id !== nextMessage.user?.id && message.user?.id == previousMessage.user?.id) {
        if ((message.repliedTo && previousMessage.repliedTo) || (message.repliedTo && !previousMessage.repliedTo)) {
          return 'single';
        } else if ((!message.repliedTo && previousMessage.repliedTo) || (!message.repliedTo && !previousMessage.repliedTo)) {
          return 'last';
        }
      } else { 
        if (message.repliedTo) {
          if (nextMessage.repliedTo) {
            return 'single';
          } else {
            return 'first';
          }
        } else { 
          if ((!previousMessage.repliedTo && !nextMessage.repliedTo) || (previousMessage.repliedTo && !nextMessage.repliedTo)) {
            return 'middle';
          } else if ((previousMessage.repliedTo && !nextMessage.repliedTo) || (!previousMessage.repliedTo && nextMessage.repliedTo) || (previousMessage.repliedTo && nextMessage.repliedTo)) { 
            return 'last';
          }
        }
      }
    }
  
    return order;
  }

  isLastMessage(message: any): boolean {
    if (this.messages.length === 1) {
      return true;
    }
  
    const messageIndex = this.messages.indexOf(message);
  
    return messageIndex === this.messages.length - 1 || this.messages[messageIndex + 1]?.user?.id !== message.user.id;
  }
}
