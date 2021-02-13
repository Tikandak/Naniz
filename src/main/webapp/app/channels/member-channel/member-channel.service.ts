import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from 'app/core/message/message.model';

@Injectable({ providedIn: 'root' })
export class MemberChannelService {
  public resourceUrl = SERVER_API_URL + 'api/messages';

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des messages pour le topic pris en entrée
   * @param topic
   * @param pageToLoad
   * @param pageSize
   */
  getMessagesForTopic(topic: number, pageToLoad: number, pageSize: number): Observable<Message[]> {
    return this.http.get<Message[]>(this.resourceUrl, {
      params: new HttpParams()
        .set('topic', topic.toString())
        .set('pageToLoad', pageToLoad.toString())
        .set('pageSize', pageSize.toString())
    });
  }
}
