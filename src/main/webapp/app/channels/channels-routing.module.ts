import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { publicChannelRoute } from 'app/channels/public-channel/public-channel.route';
import { PublicChannelComponent } from 'app/channels/public-channel/public-channel.component';
import { NanizSharedModule } from 'app/shared/shared.module';
import { memberChannelRoute } from 'app/channels/member-channel/member-channel.route';
import { MemberChannelComponent } from 'app/channels/member-channel/member-channel.component';
import { PrivateChannelComponent } from 'app/channels/private-channel/private-channel.component';
import { privateChannelRoute } from 'app/channels/private-channel/private.channel.route';
import { TopicCreationComponent } from 'app/layouts/topic-creation/topic-creation.component';
import { EditorModule } from 'primeng';
import { TopicComponent } from 'app/channels/topic/topic.component';
import { NbBadgeModule, NbChatModule, NbDialogModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { ViewTopicComponent } from 'app/channels/view-topic/view-topic.component';
import { HelpDialogComponent } from 'app/layouts/help-dialog/help-dialog.component';

const channelsModuleRoutes: Routes = [publicChannelRoute, memberChannelRoute, privateChannelRoute];

@NgModule({
  imports: [
    RouterModule.forChild(channelsModuleRoutes),
    NanizSharedModule,
    EditorModule,
    NbUserModule,
    NbTooltipModule,
    NbChatModule,
    NbBadgeModule,
    NbDialogModule.forChild()
  ],
  declarations: [
    TopicCreationComponent,
    PublicChannelComponent,
    MemberChannelComponent,
    PrivateChannelComponent,
    TopicComponent,
    ViewTopicComponent,
    HelpDialogComponent
  ],
  exports: [RouterModule, TopicCreationComponent, PublicChannelComponent, MemberChannelComponent, PrivateChannelComponent],
  entryComponents: [HelpDialogComponent]
})
export class ChannelsRoutingModule {}
