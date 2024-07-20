import { Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/common/components/dialog/services';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnDestroy{
  @ViewChild('zoomedImage') zoomedImageModal!: TemplateRef<any>;

  messages = [
    {
      content: 'Hello',
      own: true,
      // user: {
      //   avatar: '../../../../../../assets/avatar-1.png',
      // },
      repliedTo: {
        content: 'Xin chào làm quen nhaaaaaaaaaaaaaaaaaa'
      },
      user: {
        id: 1,
        name: 'Đỗ Minh Quân'
      }
    },
    {
      content: 'chiến thần nào đấy?',
      own: true,
      user: {
        id: 1,
        name: 'Đỗ Minh Quân'
      }
      // repliedTo: {
      //   content: 'ai cơ?'
      // }
    },
    {
      content: 'tốt nghiệp xuất sắc kh :v',
      own: false,
      user: {
        id: 2,
        avatar: '../../../../../../assets/avatar-1.png',
        name: 'Nguyễn Mạnh Hải'
      },
      repliedTo: {
        content: 'chiến thần nào đấy?'
      }
    },
    {
      content: 'chưa chắc đã xuất sắc đâu',
      own: false,
      user: {
        id: 2,
        avatar: '../../../../../../assets/avatar-1.png',
        name: 'Nguyễn Mạnh Hải'
      }
    },
    {
      content: 'ừ :v',
      own: true,
      // user: {
      //   avatar: '../../../../../../assets/avatar-1.png',
      // },
      user: {
        id: 1,
        name: 'Đỗ Minh Quân'
      }
    },
    {
      content: 'tốt nghiệp xuất sắc kh :v',
      own: false,
      user: {
        id: 3,
        avatar: '../../../../../../assets/avatar-2.png',
        name: 'Hồ Văn Hiếu'
      },
      repliedTo: {
        content: 'xin chào mọi người?'
      }
    },
    {
      content: 'tốt nghiệp xuất sắc kh :v',
      own: false,
      user: {
        id: 2,
        avatar: '../../../../../../assets/avatar-1.png',
        name: 'Nguyễn Mạnh Hải'
      },
      image: '../../../../../../assets/san-marco.jpg',
      repliedTo: {
        content: 'hehe'
      }
    },
    {
      content: 'tốt nghiệp xuất sắc kh :v',
      own: false,
      user: {
        id: 2,
        avatar: '../../../../../../assets/avatar-1.png',
        name: 'Nguyễn Mạnh Hải'
      },
      image: '../../../../../../assets/avatar-1.png',
      repliedTo: {
        content: 'hehe'
      }
    },
  ]

  constructor(
    private dialogService: DialogService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    
  }

  onClick(): void {
    this.dialogService.confirm('title', 'description', new Observable);
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
  
    return messageIndex === this.messages.length - 1 || this.messages[messageIndex + 1]?.user?.id !== message.user.id;
  }

  ngOnDestroy(): void {
    
  }
}
