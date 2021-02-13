import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITopic } from 'app/entities/topic/topic.model';

@Component({
  selector: 'jhi-view-topic',
  templateUrl: './view-topic.component.html',
  styleUrls: ['./view-topic.component.scss']
})
export class ViewTopicComponent implements OnInit {
  @Input()
  topic: ITopic | null = null;

  @Output()
  cancelTopicView = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
