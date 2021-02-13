import { Route } from '@angular/router';
import { MemberChannelComponent } from 'app/channels/member-channel/member-channel.component';

export const memberChannelRoute: Route = {
  path: 'member-channel',
  component: MemberChannelComponent,
  data: {
    pageTitle: 'memberChannel.title',
    authorities: ['ROLE_MEMBER']
  }
};
