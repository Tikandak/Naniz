import { ChannelType } from 'app/shared/constants/channel-type.enum';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { TopicService } from 'app/entities/topic/topic.service';
import { ISaveEventData } from 'app/layouts/topic-creation/saveEventData.model';
import { TranslateService } from '@ngx-translate/core';
import { ITopic } from 'app/entities/topic/topic.model';

@Component({
  selector: 'jhi-topic-creation',
  templateUrl: 'topic-creation.html',
  styleUrls: ['./topic-creation.scss']
})
export class TopicCreationComponent implements AfterViewInit {
  /** le topic à enregistrer */
  topic: ITopic = {
    title: '',
    description: ''
  };

  /** Objet retourné au parent après l'enregistrement du topic, donnant le resultat*/
  saveData: ISaveEventData = {
    isError: false,
    message: ''
  };

  /** Le placeholder du contenu */
  contentPlaceholder: string;

  /** dit si l'écran ou ce component est injecté est en mode édition */
  @Input() isModeEdition = false;

  /** le channel ou se trouve le component */
  @Input() channel: ChannelType | null = null;

  /** evenement de sauvegarde */
  @Output() saveEvent = new EventEmitter();
  @Output() beforeSaveEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  constructor(public topicService: TopicService, public translationService: TranslateService) {
    this.contentPlaceholder = translationService.instant('global.topic.creation.contentPlaceholder');
  }

  /**
   * Sauvegarde le sujet créé en base de données
   */
  saveTopic(): void {
    if (this.topic.title) {
      this.topic.channel = this.channel ? this.channel : null;
      this.beforeSaveEvent.emit();
      this.topicService.createTopic(this.topic).subscribe(
        () => {
          this.saveData.isError = false;
          this.saveData.message = 'global.topic.creation.createSuccess';
          this.saveEvent.emit(this.saveData);
          this.topic = { title: '', description: '' };
        },
        () => {
          this.saveData.isError = true;
          this.saveData.message = 'global.topic.creation.createError';
          this.saveEvent.emit(this.saveData);
          this.topic = { title: '', description: '' };
        }
      );
    }
  }

  /**
   * Envoie un évenement d'annulation
   */
  cancel(): void {
    this.topic = this.topic = { title: '', description: '' };
    this.cancelEvent.emit();
  }

  ngAfterViewInit(): void {
    this.topic.channel = this.channel;
  }
}
