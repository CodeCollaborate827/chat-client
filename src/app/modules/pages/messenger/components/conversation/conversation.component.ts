import { Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/shared/components/dialog/services';
import { NewMessage } from '../../models';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      sentAt: '19:31',
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
      reactions: 
        { 
          heart: [
            {
              name: "Nguyễn Mạnh Hải"
            },
            {
              name: "Đỗ Doãn Vũ"
            },
          ],
          haha: [
            {
              name: "Hồ Văn Hiếu"
            },
          ]
        },
      reactionCount: 3,
      sentAt: '19:37',
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
      sentAt: '19:37',
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
      sentAt: '19:47',
      reactions: 
      { 
        heart: [
          {
            name: "Nguyễn Mạnh Hải"
          },
          {
            name: "Đỗ Doãn Vũ"
          },
        ],
        haha: [
          {
            name: "Hồ Văn Hiếu"
          },
        ]
      },
      reactionCount: 3
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
      },
      sentAt: '19:49',
      reactions: 
      { 
        heart: [
          {
            name: "Nguyễn Mạnh Hải"
          },
          {
            name: "Đỗ Doãn Vũ"
          },
        ],
        haha: [
          {
            name: "Hồ Văn Hiếu"
          },
        ]
      },
      reactionCount: 3
    },
    {
      content: 'tốt nghiệp xuất sắc kh :v',
      own: false,
      user: {
        id: 2,
        avatar: '../../../../../../assets/avatar-1.png',
        name: 'Nguyễn Mạnh Hải'
      },
      sentAt: '19:50',
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
      },
      sentAt: '19:51',
    },
    {
      content: ':vvvv',
      own: true,
      // user: {
      //   avatar: '../../../../../../assets/avatar-1.png',
      // },
      user: {
        id: 1,
        name: 'Đỗ Minh Quân'
      },
      sentAt: '19:51',
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
      },
      sentAt: '19:51',
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
      },
      reactions: 
      { 
        heart: [
          {
            name: "Nguyễn Mạnh Hải"
          },
          {
            name: "Đỗ Doãn Vũ"
          },
        ],
        haha: [
          {
            name: "Hồ Văn Hiếu"
          },
        ]
      },
      reactionCount: 3,
      sentAt: '19:51',
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
      reactions: 
      { 
        heart: [
          {
            name: "Nguyễn Mạnh Hải"
          },
          {
            name: "Đỗ Doãn Vũ"
          },
        ],
        haha: [
          {
            name: "Hồ Văn Hiếu"
          },
        ]
      },
      reactionCount: 3,
      sentAt: '19:51',
    },
  ]
  form?: FormGroup;

  newMessage: NewMessage = {};

  accept: string = '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xlsx,.xls';

  showEmojiPicker = false;

  inputContent = ''; 

  showSendButton = false;

  constructor(
    private dialogService: DialogService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    
  }

  createForm(): void { 
    this.form = this.fb.group({
      text: [],
      file: []
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      console.log(input.files);
    }
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
