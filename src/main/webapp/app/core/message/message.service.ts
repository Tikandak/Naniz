import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { Location } from '@angular/common';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { Message } from 'src/main/webapp/app/core/message/message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  public stompClient: any;
  private connectionSubject: ReplaySubject<void> = new ReplaySubject(1);
  private connectionSubscription: Subscription | null = null;
  private stompSubscription: Stomp.Subscription | null = null;
  private listenerSubject: Subject<Message> = new Subject();
  private notifyUrl = '/topic/message/notify/';
  private suscribeUrl = '/topic/message/push/';

  constructor(private authServerProvider: AuthServerProvider, private location: Location) {}

  connect(): void {
    if (this.stompClient && this.stompClient.connected) {
      return;
    }

    let serverUrl = '/websocket/tracker';
    serverUrl = this.location.prepareExternalUrl(serverUrl);
    const authToken = this.authServerProvider.getToken();
    if (authToken) {
      serverUrl += '?access_token=' + authToken;
    }
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.connectionSubject.next();
    });
  }

  sendMessage(message: any): void {
    if (!this.stompClient || !this.stompClient.connected) {
      this.connect();
    }

    this.stompClient.send(
      this.notifyUrl + message.topic, // destination
      JSON.stringify(message), // body
      {} // header
    );
  }

  subscribe(topicId: number): void {
    if (this.connectionSubscription) {
      this.unsubscribe();
    }

    this.connectionSubscription = this.connectionSubject.subscribe(() => {
      if (this.stompClient) {
        this.stompSubscription = this.stompClient.subscribe(this.suscribeUrl + topicId, (data: Stomp.Message) => {
          this.listenerSubject.next(JSON.parse(data.body));
        });
      }
    });
  }

  receive(): Subject<Message> {
    return this.listenerSubject;
  }

  unsubscribe(): void {
    if (this.stompSubscription) {
      this.stompSubscription.unsubscribe();
      this.stompSubscription = null;
    }

    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
      this.connectionSubscription = null;
    }
  }

  disconnect(): void {
    this.unsubscribe();

    this.connectionSubject = new ReplaySubject(1);

    if (this.stompClient) {
      if (this.stompClient.connected) {
        this.stompClient.disconnect();
      }
      this.stompClient = null;
    }
  }
}
