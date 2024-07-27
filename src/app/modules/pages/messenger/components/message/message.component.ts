import { Component, Input, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() messages: any = [];
  @Input() message: any = {};
  isMessageOptionsHidden?: boolean;

  constructor(

  ) {

  }

  ngOnInit(): void {
    this.isMessageOptionsHidden = true;
  }

  toggleMessageOptions(hidden: boolean) {
    this.isMessageOptionsHidden = hidden ? true : false;
  }
    
  get messageOrder(): string {
    // if there is no message
    if (this.messages.length === 0) {
      return '';
    }
    // if there is only one message 
    if (this.messages.length === 1) {
      return 'single';
    }
    const messageIndex = this.messages.indexOf(this.message);

    // if (this.displayTimeline) {
    //   const prev
    // }
    // if the message is the first message
    if (messageIndex == this.messages.length - 1) {
      // if the message and the next message are of the same user
      const nextMessage = this.messages[messageIndex - 1]
      if (this.message.user?.id == nextMessage.user?.id) {
        if (this.message.repliedTo && nextMessage.repliedTo) {
          return 'single';
        } else if (this.message.repliedTo && !nextMessage.repliedTo || !this.message.repliedTo) {
          return 'first';
        }
      }
      // if the message and the next message are of different user
      else {
        return 'single';
      }
      // if the message is the last message
    } else if (messageIndex == 0) {
      const previousMessage = this.messages[messageIndex + 1];
      // if the message and the previous message are of the same user
      if (this.message.user?.id == previousMessage.user?.id) {
        if (this.message.repliedTo && !previousMessage.repliedTo || this.message.repliedTo && previousMessage.repliedTo ) {
          return 'single';
        } else if (!this.message.repliedTo) {
          return 'last';
        }
        // if the message and the previous message are of different user
      } else {
        return 'single';
      }
      // if the message is in the middle
    } else {
      const nextMessage = this.messages[messageIndex - 1];
      const previousMessage = this.messages[messageIndex + 1];
      // if the message's user is different from both previous and next message
      if (this.message.user?.id !== previousMessage.user?.id && this.message.user?.id !== nextMessage.user?.id) {
        return 'single';
      }
      else if (this.message.user?.id !== previousMessage.user?.id && this.message.user?.id == nextMessage.user?.id) {
        if ((!this.message.repliedTo && nextMessage.repliedTo) || 
          (this.message.repliedTo && nextMessage.repliedTo) || this.message.reactionCount > 0) {
          return 'single';
        } else if ((this.message.repliedTo && !nextMessage.repliedTo) || (!this.message.repliedTo && !nextMessage.repliedTo)) {
          return 'first';
        }
      } else if (this.message.user?.id !== nextMessage.user?.id && this.message.user?.id == previousMessage.user?.id) {
        if ((this.message.repliedTo && previousMessage.repliedTo) || 
          (this.message.repliedTo && !previousMessage.repliedTo) || 
          (previousMessage.reactionCount > 0)
        ) {
          return 'single';
        } else if (((!this.message.repliedTo && previousMessage.repliedTo) ||
          (!this.message.repliedTo && !previousMessage.repliedTo))
        ) {
          return 'last';
        }
      } else { 
        if (this.message.repliedTo) {
          if (nextMessage.repliedTo) {
            return 'single';
          } else {
            return 'first';
          }
        } else { 
          if (previousMessage.reactionCount > 0) {
            if (nextMessage.repliedTo || this.message.reactionCount) {
              return 'single';
            } else {
              return 'first';
            }
          }
          if (
            (!previousMessage.repliedTo && !nextMessage.repliedTo) || 
            (previousMessage.repliedTo && !nextMessage.repliedTo) || 
            (previousMessage.reactionCount == 0 && this.message.reactionCount == 0)
          ) {
            return 'middle';
          } else if (
            (previousMessage.repliedTo && !nextMessage.repliedTo) || 
            (!previousMessage.repliedTo && nextMessage.repliedTo) || 
            (previousMessage.repliedTo && nextMessage.repliedTo)  
            (previousMessage.reactionCount == 0 && this.message.reactionCount > 0)
          ) { 
            return 'last';
          }
        }
      }
    }
  
    return '';
  }

  uniqueReactions() {
    return Object.keys(this.message.reactions).map(type => ({
      type,
      count: this.message.reactions[type].length
    }));
  }

  uniqueReactionUsernames(): string {
    const names: string[] = [];

    Object.keys(this.message.reactions).forEach(type => {
      this.message.reactions[type].forEach((user: any) => {
        names.push(user.name);
      });
    });

    return names.join('\n');
  }

  isLastMessage(): boolean {
    if (this.messages.length === 1) {
      return true;
    }
  
    const messageIndex = this.messages.indexOf(this.message);
    return messageIndex === this.messages.length - 1 || this.messages[messageIndex - 1]?.user?.id !== this.message.user.id;
  }

  get displayTimeline(): boolean {
    // const messageIndex = this.messages.indexOf(this.message)
    // if (messageIndex == this.messages[this.messages.length + 1]) return true;
    // if (messageIndex == 0) return true;
    // const previousMessage = this.messages[messageIndex - 1];
    // console.log((dayjs(this.message.sentAt, 'HH:mm')))
    // if (dayjs(dayjs(this.message.sentAt).format('HH:mm')).diff(dayjs(previousMessage.sentAt).format('HH:mm'), 'minute') > 5) {
    //   console.log('display timeline')
    //   return true;
    // }
    const messageIndex = this.messages.indexOf(this.message);
    return [1, 2, 3].includes(messageIndex);
  }

  get displaySeen(): boolean {
    const messageIndex = this.messages.indexOf(this.message);
    return messageIndex == 0;
  }

  getReactionIcon(type: string): string {
    switch(type) {
      case "heart": 
        return "❤️";
      case "like": 
        return "👍";
      case "haha": 
        return "😆";
      case "sad": 
        return "😢";
      case "wow": 
        return "😮";
      case "angry": 
        return "😡";
      default:
        return "";
    }
  }

}
