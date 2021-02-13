import { AfterViewInit, Component, ElementRef, Renderer, ViewChild } from '@angular/core';

import { PasswordResetInitService } from './password-reset-init.service';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-password-reset-init',
  templateUrl: './password-reset-init.component.html',
  styleUrls: ['./password-reset-init.scss']
})
export class PasswordResetInitComponent implements AfterViewInit {
  @ViewChild('email', { static: false })
  email?: ElementRef;

  loading = false;
  formError = false;
  formErrorMsg = '';

  success = false;
  resetRequestForm = {
    email: ''
  };

  constructor(
    private passwordResetInitService: PasswordResetInitService,
    private renderer: Renderer,
    private toastrService: NbToastrService,
    private translateService: TranslateService
  ) {}

  ngAfterViewInit(): void {
    if (this.email) {
      this.renderer.invokeElementMethod(this.email.nativeElement, 'focus', []);
    }
  }

  requestReset(): void {
    if (this.isEmailOk()) {
      this.loading = true;
      this.passwordResetInitService.save(this.resetRequestForm.email).subscribe(() => {
        this.loading = false;
        this.resetRequestForm = {
          email: ''
        };
        this.showToast('top-right', 'success', 'reset.request.messages.success');
      });
    }
  }

  private isEmailOk(): boolean {
    let result = true;
    this.formError = false;
    this.formErrorMsg = '';
    const reg = /[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;
    if (this.resetRequestForm.email.length < 5) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.validate.email.minlength') + '<br>';
      result = false;
    }
    if (this.resetRequestForm.email.length > 254) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.validate.email.maxlength') + '<br>';
      result = false;
    }
    if (!reg.test(this.resetRequestForm.email)) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.validate.email.invalid') + '<br>';
      result = false;
    }
    if (!this.resetRequestForm.email) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.validate.email.required') + '<br>';
      result = false;
    }
    return result;
  }

  showToast(position: any, status: NbComponentStatus, message: string): void {
    this.toastrService.show(status, this.translateService.instant(message), { position, status, duration: 5000 });
  }
}
