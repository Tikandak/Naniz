import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITopic } from 'app/entities/topic/topic.model';

@Component({
  selector: 'jhi-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  @Input()
  topic: ITopic | null = null;

  @Input()
  selectTopic: ITopic | null = null;

  @Output()
  commentEvent = new EventEmitter();

  @Output()
  viewTopicEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
