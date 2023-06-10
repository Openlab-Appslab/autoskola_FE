import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  private whoIamURL = 'http://localhost:8080/whoIam';
  private getChatContactsAcceptedURL = 'http://localhost:8080/getChatContactsAccepted';
  private sendMessageURL = 'http://localhost:8080/chat';
  private chatGetURL = 'http://localhost:8080/chatGet';

  whoIam() {
    return this.http.get(this.whoIamURL);
  }

  getChatContactsAccepted() {
    return this.http.get(this.getChatContactsAcceptedURL);
  }

  sendMessage(message: any, userReceiver: any) {
    return this.http.post(this.sendMessageURL, {"message": message, "userReceiver": {"username": userReceiver}});
  }

  chatGet(userReceiver: any, userSender: any) {
    return this.http.post(this.chatGetURL, {"userReceiver": {"username": userReceiver}, "userSender": {"username": userSender}});
  }

}
