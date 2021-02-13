import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITopic } from 'app/entities/topic/topic.model';
import { ChannelType } from 'app/shared/constants/channel-type.enum';

@Injectable({ providedIn: 'root' })
export class TopicService {
  public resourceUrl = SERVER_API_URL + 'api/topics';

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des topics
   * @param channel
   */
  getActiveTopics(channel: ChannelType, pageToLoad: number, pageSize: number, search: string): Observable<ITopic[]> {
    return this.http.get<ITopic[]>(this.resourceUrl, {
      params: new HttpParams()
        .set('channel', channel.toString())
        .set('pageToLoad', pageToLoad.toString())
        .set('pageSize', pageSize.toString())
        .set('filter', search)
    });
  }

  /**
   * Crée le topic demandé en bdd
   * @param topic
   */
  createTopic(topic: ITopic): Observable<ITopic> {
    return this.http.post<ITopic>(this.resourceUrl, topic);
  }
}
