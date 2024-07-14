import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnDestroy{
  messages = [
    {
      content: 'Hello',
      own: true,
      // user: {
      //   avatar: '../../../../../../assets/san-marco.jpg',
      // },
      repliedTo: {
        content: 'Xin chào làm quen nhaaaaaaaaaaaaaaaaaa'
      }
    },
    {
      content: 'chiến thần nào đấy?',
      own: true,
      // user: {
      //   avatar: '../../../../../../assets/san-marco.jpg',
      // },
      // repliedTo: {
      //   content: 'ai cơ?'
      // }
    },
    {
      content: 'tốt nghiệp xuất sắc kh :v',
      own: false,
      user: {
        avatar: '../../../../../../assets/san-marco.jpg',
      },
      repliedTo: {
        content: 'ai cơ?'
      }
    },
    {
      content: 'ko thấy có trong dsach sv giỏi xsac',
      own: true,
    },
    {
      content: 'dbt thế nào',
      own: true,
    },
    {
      content: ':))',
      own: true,
    },
    {
      content: 'hay kh đki đi dự tốt nghiệp',
      own: false,
      user: {
        avatar: '../../../../../../assets/san-marco.jpg',
      }
    },
    {
      content: 'ừ chắc thế :v',
      own: true,
    },
    {
      content: 'sau di du thuyen cho t di ke voi nha :v',
      own: false,
      user: {
        avatar: '../../../../../../assets/san-marco.jpg',
      }
    },
    {
      image: '../../../../../../assets/san-marco.jpg',
      own: true,
    },
    {
      image: '../../../../../../assets/san-marco.jpg',
      own: true,
      repliedTo: {
        content: '???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
      },
    },
    {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ultricies neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel lacus dui. Donec id lacus quis eros tristique viverra sed in ante. Nulla finibus nibh eget diam suscipit tristique. Maecenas porta cursus felis sed dignissim. Duis lorem metus, efficitur vel eros facilisis, mattis volutpat mauris. Quisque eu est posuere dui dapibus vehicula. Cras mi purus, faucibus vel ultricies in, scelerisque et sem. Etiam faucibus consectetur urna ut elementum. Maecenas nec nunc ac est faucibus tincidunt vitae sed lorem. Nam blandit ac augue ut tincidunt.?',
      own: true,
      repliedTo: {
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ultricies neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel lacus dui. Donec id lacus quis eros tristique viverra sed in ante. Nulla finibus nibh eget diam suscipit tristique. Maecenas porta cursus felis sed dignissim. Duis lorem metus, efficitur vel eros facilisis, mattis volutpat mauris. Quisque eu est posuere dui dapibus vehicula. Cras mi purus, faucibus vel ultricies in, scelerisque et sem. Etiam faucibus consectetur urna ut elementum. Maecenas nec nunc ac est faucibus tincidunt vitae sed lorem. Nam blandit ac augue ut tincidunt.?',
      }
    },
    {
      own: true,
      content: "lorem ipsum 1",
    },
    {
      own: true,
      content: "lorem ipsum 1",
    },
    {
      own: true,
      content: "lorem ipsum 1",
    },
    {
      image: '../../../../../../assets/san-marco.jpg',
      own: false,
      user: {
        avatar: '../../../../../../assets/san-marco.jpg',
      }
    },
    {
      image: '../../../../../../assets/san-marco.jpg',
      own: false,
      user: {
        avatar: '../../../../../../assets/san-marco.jpg',
      }
    },
    {
      content: 'ừ chắc thế :v',
      own: false,
      user: {
        avatar: '../../../../../../assets/san-marco.jpg',
      }
    },
    {
      content: 'ừ chắc thế :v',
      own: false,
      user: {
        avatar: '../../../../../../assets/san-marco.jpg',
      },
      repliedTo: {
        content: "??? :D ???"
      }
    },
    {
      content: 'ừ chắc thế :v',
      own: false,
      user: {
        avatar: '../../../../../../assets/san-marco.jpg',
      }
    },
    {
      content: 'ừ chắc thế :v',
      own: true,
      repliedTo: {
        content: "??? :D ???"
      }
    },
    {
      content: 'ừ chắc thế :v',
      own: true
    },
  ]

  constructor() {

  }

  ngOnInit(): void {
    
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
      if (message.own == nextMessage.own) {
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
      if (message.own == previousMessage.own) {
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
      if (message.own !== previousMessage.own && message.own !== nextMessage.own) {
        return 'single';
      }
      else if (message.own !== previousMessage.own && message.own == nextMessage.own) {
        if ((!message.repliedTo && nextMessage.repliedTo) || (message.repliedTo && nextMessage.repliedTo)) {
          return 'single';
        } else if ((message.repliedTo && !nextMessage.repliedTo) || (!message.repliedTo && !nextMessage.repliedTo)) {
          return 'first';
        }
      } else if (message.own !== nextMessage.own && message.own == previousMessage.own) {
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
          } else if ((previousMessage.repliedTo && !nextMessage.repliedTo) || (!previousMessage.repliedTo && nextMessage.repliedTo)) { 
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
  
    return messageIndex === this.messages.length - 1 || this.messages[messageIndex + 1].own !== message.own;
  }

  ngOnDestroy(): void {
    
  }
}
