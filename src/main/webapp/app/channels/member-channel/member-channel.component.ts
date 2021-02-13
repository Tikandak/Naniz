import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TopicService } from 'app/entities/topic/topic.service';
import { ChannelType } from 'app/shared/constants/channel-type.enum';
import { ISaveEventData } from 'app/layouts/topic-creation/saveEventData.model';
import { NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'app/core/auth/account.service';
import { MessageService } from 'app/core/message/message.service';
import { Subscription } from 'rxjs';
import { Message } from 'app/core/message/message.model';
import { Account } from 'app/core/user/account.model';
import { MemberChannelService } from 'app/channels/member-channel/member-channel.service';
import { ITopicCard } from 'app/channels/member-channel/topic-card.model';
import { ITopic } from 'app/entities/topic/topic.model';
import { HelpDialogComponent } from 'app/layouts/help-dialog/help-dialog.component';

export interface IChat {
  status: string;
  title: string;
  messages: Message[];
}
export class Chat implements IChat {
  constructor(public status: string, public title: string, public messages: Message[]) {}
}

@Component({
  selector: 'jhi-member-channel',
  templateUrl: './member-channel.component.html',
  styleUrls: ['./member-channel.component.scss']
})
export class MemberChannelComponent implements OnInit, OnDestroy, AfterViewInit {
  /** La card contenant les topics */
  topicCard: ITopicCard = {
    topics: [],
    loading: false,
    pageToLoadNext: 0,
    placeholders: []
  };

  /** Taille de page */
  pageSize = 5;

  /** Channel dans lequel on se trouve */
  channel = ChannelType.MEMBER_CHANNEL;

  /** Trigger pour passer en mode modification */
  isModeEdition = false;

  /** trigger mode vision d'un topic */
  isModeViewTopic = false;

  /** Filtre de recherche */
  search = '';
  searchOldValue = '';

  /** Affichage du chat */
  showChat = true;

  account: Account | null = null;

  chat: Chat;
  subscription?: Subscription;
  currentTopic: ITopic | null = null;

  constructor(
    private topicService: TopicService,
    private toastrService: NbToastrService,
    private translateService: TranslateService,
    private accountService: AccountService,
    private messageService: MessageService,
    private memberChannelService: MemberChannelService,
    private dialogService: NbDialogService
  ) {
    // Récupération des topics
    this.initTopicCard();
    this.loadNext(this.topicCard);

    // Récupération du compte du user connecté
    this.accountService.identity(false).subscribe(acc => {
      this.account = acc;
    });
    this.chat = new Chat('default', 'Chat espace membres', []);
  }

  ngAfterViewInit(): void {
    // push message d'on boarding
    this.sendTopicSelectionMessage();
  }

  private sendTopicSelectionMessage(): void {
    const msg =
      'Bonjour ' +
      (this.account !== null ? this.account.login : '') +
      ', \n\nCliquez sur "Commenter" dans l\'un des sujets du moment à gauche ' +
      'pour commencer à discuter avec les autres membres ou proposez leur un sujet de discussion en cliquant sur l\'icone "+" ' +
      'dans la barre de recherche.';
    this.sendDefaultMessage(msg, false);
  }

  ngOnInit(): void {
    this.subscription = this.messageService.receive().subscribe((message: Message) => {
      if (this.account && message.sender === this.account.login) {
        message.reply = true;
      }
      this.chat.messages.push(message);
    });
  }

  openHelpDialog(): void {
    this.dialogService.open(HelpDialogComponent);
  }

  sendDefaultMessage(msg: string, resetMsgs: boolean): void {
    if (resetMsgs) {
      this.chat.messages = [];
    }
    this.chat.messages.push({
      type: 'TEXT',
      date: new Date(),
      sender: 'Terence',
      avatar: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png',
      text: msg,
      reply: false
    });
  }

  viewTopic(topic: ITopic): void {
    this.isModeViewTopic = true;
    this.currentTopic = topic;
    this.getChatForTopic(topic);
  }

  getChatForTopic(topic: ITopic): void {
    this.chat.status = 'success';
    this.chat.title = 'Sujet: ' + topic.title;
    this.currentTopic = topic;
    this.messageService.subscribe(topic.id!); // abonnement au topic pour recevoir les messages

    // récupération des messages du chat
    this.memberChannelService.getMessagesForTopic(topic.id!, 0, 100).subscribe((messages: any) => {
      if (messages.length > 0) {
        this.chat.messages = [];
        messages.forEach((message: any) => {
          if (this.account && message.sender === this.account.login) {
            message.reply = true;
          }
          this.chat.messages.push(message);
        });
      } else {
        this.sendDefaultMessage('Ce sujet ne contient pas encore de messages, soyez le premier à commenter !', true);
      }
    });
  }

  sendMessage(messages: any, event: any): void {
    if (event.message && this.currentTopic) {
      const message = new Message();
      message.sender = this.account !== null ? this.account.login : '';
      message.avatar = this.account !== null ? this.account.imageUrl : '';
      message.type = 'TEXT';
      message.date = new Date();
      message.text = event.message;
      message.topic = this.currentTopic.id;
      this.messageService.sendMessage(message);
    } else {
      this.sendDefaultMessage('Cliquez sur "Commenter" dans l\'un des sujets du moment à gauche pour chatter.', true);
    }
  }

  searchTopic(): void {
    if (this.search.length >= 3 || (this.search.length < 3 && this.searchOldValue)) {
      this.searchOldValue = this.search;
      this.initTopicCard();
      this.loadNext(this.topicCard);
    }
  }

  refresh(): void {
    this.currentTopic = null;
    this.chat = new Chat('default', 'Chat espace membres', []);
    this.initTopicCard();
    this.loadNext(this.topicCard);
    this.sendTopicSelectionMessage();
  }

  /**
   * Charge la page suivante sur scroll de la topicsCard
   * @param cardData
   */
  loadNext(cardData: any): void {
    if (cardData.loading) {
      return;
    }
    cardData.loading = true;
    cardData.placeholders = new Array(this.pageSize);
    this.topicService
      .getActiveTopics(ChannelType.MEMBER_CHANNEL, cardData.pageToLoadNext, this.pageSize, this.search)
      .subscribe(nextTopics => {
        cardData.placeholders = [];
        cardData.topics.push(...nextTopics);
        cardData.loading = false;
        cardData.pageToLoadNext++;
      });
  }

  /**
   * Event lancé lorsqu'un topic a été sauvegardé
   * @param data
   */
  onTopicSave(data: ISaveEventData): void {
    // refresh de l'écran pour afficher d'éventuels nouveautés
    if (data.isError) {
      this.showToast('top-right', 'danger', data.message);
    } else {
      this.showToast('top-right', 'success', data.message);
    }
    this.initTopicCard();
    this.loadNext(this.topicCard);
    this.isModeEdition = false;
  }

  showToast(position: any, status: NbComponentStatus, message: string): void {
    this.toastrService.show(status, this.translateService.instant(message), { position, status, duration: 5000 });
  }

  cancelEdition(): void {
    this.isModeEdition = false;
  }

  ngOnDestroy(): void {
    this.messageService.unsubscribe();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initTopicCard(): void {
    this.topicCard = {
      topics: [],
      loading: false,
      pageToLoadNext: 0,
      placeholders: []
    };
  }
}
