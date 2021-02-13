import { ChannelType } from 'app/shared/constants/channel-type.enum';

export interface ITopic {
  id?: number | undefined;
  title: string;
  description: any;
  content?: any;
  image?: string;
  nombreMessages?: number;
  activated?: number;
  user?: string;
  date?: string;
  channel?: ChannelType | null;
}
