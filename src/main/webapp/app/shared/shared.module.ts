import { NgModule } from '@angular/core';
import { NanizSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { MaterialModule } from 'app/shared/material/material.module';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSpinnerModule
} from '@nebular/theme';

@NgModule({
  imports: [
    NanizSharedLibsModule,
    MaterialModule,
    MatProgressSpinnerModule,
    OverlayModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbCheckboxModule,
    NbSpinnerModule,
    NbListModule,
    NbActionsModule
  ],
  declarations: [FindLanguageFromKeyPipe, AlertComponent, AlertErrorComponent, LoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [LoginModalComponent, MatSpinner],
  exports: [
    NanizSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbCheckboxModule,
    NbSpinnerModule,
    NbListModule,
    NbActionsModule
  ]
})
export class NanizSharedModule {}
