import { NgModule } from '@angular/core';

import './vendor';
import { NanizSharedModule } from 'app/shared/shared.module';
import { NanizCoreModule } from 'app/core/core.module';
import { NanizAppRoutingModule } from './app-routing.module';
import { NanizHomeModule } from './home/home.module';
import { NanizEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbButtonModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MenuComponent } from './layouts/menu/menu.component';
import { RxStompService } from '@stomp/ng2-stompjs';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NanizSharedModule,
    NanizCoreModule,
    NanizHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    NanizEntityModule,
    NanizAppRoutingModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbThemeModule.forRoot(),
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbEvaIconsModule
  ],
  declarations: [MainComponent, ErrorComponent, PageRibbonComponent, FooterComponent, MenuComponent],
  bootstrap: [MainComponent],
  providers: [RxStompService]
})
export class NanizAppModule {}
