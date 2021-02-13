import { ITopic } from 'app/entities/topic/topic.model';

export interface ITopicCard {
  topics?: ITopic[];
  loading?: boolean;
  pageToLoadNext?: number;
  placeholders?: [];
}
