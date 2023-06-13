import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ViewChild, ElementRef } from '@angular/core';

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
  @ViewChild('chatContainer') private chatContainer: ElementRef;

  constructor(private chatService: ChatService, private route: ActivatedRoute) { }

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
              this.userReceiver = this.route.snapshot.paramMap.get('receiver');
              this.chatService.chatGet(this.userReceiver, this.whoIam.username).subscribe(
                (data: any) => {
                  this.messages = data;
                  setTimeout(() => {
                    this.scrollToBottom();
                  }
                  , 0);
                }
              );
            }
          );
        }
      }
    );
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  isChatPage(): boolean {
    const urlSegments = this.route.snapshot.url;
    if (urlSegments.length !== 2 || urlSegments[0].path !== 'chat') {
      return false;
    }
    const username = urlSegments[1].path;
    return !!username;
  }

  getMessages(receiver: any) {
    this.chatService.chatGet(receiver, this.whoIam.username).subscribe(
      (data: any) => {
        if (this.messages.length !== data.length) {
          this.messages = data;
          setTimeout(() => {
            this.scrollToBottom();
          }, 0);
        }
        else {
          for (let i = 0; i < data.length; i++) {
            if (this.messages[i].id !== data[i].id) {
              this.messages = data;
              setTimeout(() => {
                this.scrollToBottom();
              }, 0);
              break;
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
        this.scrollToBottom();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
}  
