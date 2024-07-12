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
      own: false,
      user: {
        avatar: '../../../../../../assets/san-marco.jpg',
      }
    },
    {
      content: 'chiến thần ng hiền an',
      own: false,
      user: {
        avatar: '../../../../../../assets/san-marco.jpg',
      }
    },
    {
      content: 'tốt nghiệp xuất sắc kh :v',
      own: false,
      user: {
        avatar: '../../../../../../assets/san-marco.jpg',
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
      content: 'aa',
      image: '../../../../../../assets/san-marco.jpg',
      own: true,
    },
    {
      content: 'hehe',
      image: '../../../../../../assets/san-marco.jpg',
      own: true,
    },
    {
      content: 'hehe dep koahsdjkashdjkashdjkasdhajkdhkajsdhakjhdaks?',
      own: true,
    },
    {
      content: '?',
      image: '../../../../../../assets/san-marco.jpg',
      own: false,
      user: {
        avatar: '../../../../../../assets/san-marco.jpg',
      }
    },
    {
      content: 'hehe',
      image: '../../../../../../assets/san-marco.jpg',
      own: false,
      user: {
        avatar: '../../../../../../assets/san-marco.jpg',
      }
    },
  ]

  constructor() {

  }

  ngOnInit(): void {
    
  }
  
  getMessageOrder(message: any): string {
    let order = ''
    if (this.messages.length === 0) {
      order = '';
      return order;
    }
    if (this.messages.length === 1) {
      order = 'single';
      return order;
    }
    const messageIndex = this.messages.indexOf(message);
    if (messageIndex == this.messages.length - 1) {
      if (this.messages[messageIndex].own == this.messages[messageIndex - 1].own)
        order = 'last';
      else order = 'single';
      return order;
    }
    if (messageIndex == 0) {
      if (this.messages[1].own == this.messages[0].own) 
        order = 'first';
      else {
        order = 'single';
      }
    } else {
      if (
        this.messages[messageIndex].own !== this.messages[messageIndex - 1].own && 
        this.messages[messageIndex].own !== this.messages[messageIndex + 1].own
      ) order = 'single';
      else if (
        this.messages[messageIndex].own == this.messages[messageIndex - 1].own && 
        this.messages[messageIndex].own !== this.messages[messageIndex + 1].own
      ) order = 'last';
      else if (
        this.messages[messageIndex].own !== this.messages[messageIndex - 1].own && 
        this.messages[messageIndex].own == this.messages[messageIndex + 1].own
      ) order = 'first';
      else order = 'middle';
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
