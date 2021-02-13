export interface IMessage {
  id?: number;
  type?: string;
  files?: string;
  date?: Date;
  sender?: string;
  avatar?: string;
  topic?: number;
  text?: string;
  reply?: boolean;
}

export class Message implements IMessage {
  public id?: number;
  public type?: string;
  public files?: string;
  public date?: Date;
  public sender?: string;
  public avatar?: string;
  public topic?: number;
  public text?: string;
  public reply?: boolean;
}
