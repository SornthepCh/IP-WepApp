import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faClock, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { NgxLongPress2Module } from 'ngx-long-press2';
import { TimeagoModule } from 'ngx-timeago';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';
//import { NgxLongPress2Module } from 'ngx-long-press2'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true, 
  imports: [CommonModule, FontAwesomeModule,TimeagoModule,FormsModule,NgxLongPress2Module],
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() username?: string
  //@Input() messages: Message[] = []
  @ViewChild('messageForm') messageForm?: NgForm
  messageContent = ''

  faClock =faClock
  faPaperPlane=faPaperPlane

  constructor(public messageService: MessageService) { }
  sendMessage() {
    if (!this.username) return
    this.messageService.sendMessage(this.username, this.messageContent)
    ?.then(() => {
      this.messageForm?.reset()
    })
  }
  loadMessages() {
    if (!this.username) return

    this.messageService.getMessagesThread(this.username).subscribe({
      //next: response => this.messages = response
    })
  }

  ngOnInit(): void {
    //this.loadMessages()
  }
  onLongPressMessage(id: number) {
    // console.log('delete me, id: ' + id)
    this.messageService.deleteMessage(id).subscribe({
      //next: _ => this.messages?.splice(this.messages.findIndex(ms => ms.id === id), 1)
    })
  }
}