import { Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/shared/components/dialog/services';

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
      },
      sentAt: '19:35'
    },
    {
      content: 'chiến thần nào đấy?',
      own: true,
      user: {
        id: 1,
        name: 'Đỗ Minh Quân'
      },
      // repliedTo: {
      //   content: 'ai cơ?'
      // }
      sentAt: '19:37'
    },
    {
      content: '',
      attachment: {
        name: 'unnamed.doc',
        size: '17.12 KB',
      },
      own: true,
      user: {
        id: 1,
        name: 'Đỗ Minh Quân'
      },
      repliedTo: {
        content: 'gửi file đi'
      },
      sentAt: '19:47'
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

  showEmojiPicker = false;

  inputContent = ''; 

  showSendButton = false;

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


  ngOnDestroy(): void {
    
  }

  addEmoji(event: any) {
    this.inputContent += event.emoji.native;
    console.log('Emoji added:', event.emoji.native);
    this.updateSendButtonState();
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  updateSendButtonState() {
    this.showSendButton = this.inputContent.trim().length > 0;
  }

  sendMessage() {
    if (this.inputContent.trim()) {
      console.log('Message sent:', this.inputContent);
      this.inputContent = ''; 
      this.updateSendButtonState();
    }
  }
}
