import { Route } from '@angular/router';
import { PrivateChannelComponent } from 'app/channels/private-channel/private-channel.component';

export const privateChannelRoute: Route = {
  path: 'private-channel',
  component: PrivateChannelComponent,
  data: {
    pageTitle: 'privateChannel.title',
    authorities: ['ROLE_PREMIUM']
  }
};
