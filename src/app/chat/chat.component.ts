import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: string;
  userReceiver: any;
  whoIam: any = {};
  acceptedContacts: any[] = [];
  messages: any[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.whoIam().subscribe(
      (data: any) => {
        this.whoIam = data;
        interval(3000)
          .pipe(takeWhile(() => this.isChatPage() || this.whoIam.authority === 'STUDENT'))
          .subscribe(() => {
            this.getMessages(this.userReceiver);
          });
        if (this.whoIam.authority === 'STUDENT') {
          this.chatService.getChatContactsAccepted().subscribe(
            (data: any) => {
              for (let i = 0; i < data.length; i++) {
                if (data[i].firstUser.username !== this.whoIam.username) {
                  this.userReceiver = data[i].firstUser.username;
                } else {
                  this.userReceiver = data[i].secondUser.username;
                }
              }
              this.getMessages(this.userReceiver);
            }
          );
        } else if (this.whoIam.authority === 'ADMIN' || this.whoIam.authority === 'INSTRUCTOR') {
          this.chatService.getChatContactsAccepted().subscribe(
            (data: any) => {
              for (let i = 0; i < data.length; i++) {
                if (data[i].firstUser.username !== this.whoIam.username) {
                  this.acceptedContacts.push(data[i].firstUser.username);
                } else {
                  this.acceptedContacts.push(data[i].secondUser.username);
                }
              }
              // get receiver from URL
              this.userReceiver = sessionStorage.getItem('receiver');
              this.chatService.chatGet(this.userReceiver, this.whoIam.username).subscribe(
                (data: any) => {
                  this.messages = data;
                }
              );
            }
          );
        }
      }
    );
  }

  isChatPage(): boolean {
    if (sessionStorage.getItem('receiver')) {
      return true;
    }
    const username = sessionStorage.getItem('receiver');
    return !!username;
  }

  getMessages(receiver: any) {
    this.chatService.chatGet(receiver, this.whoIam.username).subscribe(
      (data: any) => {
        if (this.messages.length !== data.length) {
          this.messages = data;
        }
        else {
          for (let i = 0; i < data.length; i++) {
            if (this.messages[i].id !== data[i].id) {
              this.messages = data;
            }
          }
        }
      }
    );
  }
  
  sendMessage() {
    this.chatService.sendMessage(this.message, this.userReceiver).subscribe(
      (data: any) => {
        this.message = '';
        this.getMessages(this.userReceiver);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getMessagesAndSaveReceiver(receiver: any) {
    // if receiver in sessionStorage is set, remove it and set new one
    if (sessionStorage.getItem('receiver')) {
      sessionStorage.removeItem('receiver');
    }
    sessionStorage.setItem('receiver', receiver);
    this.userReceiver = receiver;
    this.getMessages(receiver);
  }
}
