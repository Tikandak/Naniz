import { Route } from '@angular/router';
import { PublicChannelComponent } from 'app/channels/public-channel/public-channel.component';

export const publicChannelRoute: Route = {
  path: 'public-channel',
  component: PublicChannelComponent,
  data: {
    pageTitle: 'publicChannel.title',
    authorities: ['ROLE_MEMBER']
  }
};
