import { AfterViewInit, Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { PasswordResetFinishService } from './password-reset-finish.service';
import { TranslateService } from '@ngx-translate/core';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'jhi-password-reset-finish',
  templateUrl: './password-reset-finish.component.html',
  styleUrls: ['./password-reset-finish.component.scss']
})
export class PasswordResetFinishComponent implements OnInit, AfterViewInit {
  @ViewChild('newPassword', { static: false })
  newPassword?: ElementRef;

  initialized = false;
  doNotMatch = false;
  error = false;
  success = false;
  key = '';
  formError = false;
  formErrorMsg = '';

  passwordForm = {
    newPassword: '',
    confirmPassword: ''
  };

  constructor(
    private passwordResetFinishService: PasswordResetFinishService,
    private loginModalService: LoginModalService,
    private route: ActivatedRoute,
    private renderer: Renderer,
    private fb: FormBuilder,
    private router: Router,
    private translateService: TranslateService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['key']) {
        this.key = params['key'];
      }
      this.initialized = true;
    });
  }

  ngAfterViewInit(): void {
    if (this.newPassword) {
      this.renderer.invokeElementMethod(this.newPassword.nativeElement, 'focus', []);
    }
  }

  finishReset(): void {
    const newPassword = this.passwordForm.newPassword;
    if (
      this.isPasswordOk(this.passwordForm.newPassword, 'newpassword') &&
      this.isPasswordOk(this.passwordForm.confirmPassword, 'confirmpassword')
    ) {
      this.passwordResetFinishService.save(this.key, newPassword).subscribe(
        () => (this.success = true),
        () => {
          if (this.key) {
            this.showToast('top-right', 'info', 'reset.finish.messages.info');
          } else {
            this.showToast('top-right', 'danger', 'reset.finish.messages.error');
          }
        }
      );
    }
  }

  private isPasswordOk(password: string, passwordKey: string): boolean {
    let result = true;
    this.formError = false;
    this.formErrorMsg = '';
    if (password.length < 4) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.validate.' + passwordKey + '.minlength') + '<br>';
      result = false;
    }
    if (password.length > 50) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.validate.' + passwordKey + '.maxlength') + '<br>';
      result = false;
    }
    if (!password) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.validate.' + passwordKey + '.required') + '<br>';
      result = false;
    }
    if (
      (passwordKey === 'newpassword' && password !== this.passwordForm.confirmPassword) ||
      (passwordKey === 'confirmpassword' && password !== this.passwordForm.newPassword)
    ) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.error.dontmatch') + '<br>';
      result = false;
    }
    return result;
  }

  login(): void {
    this.router.navigate(['/']);
  }

  showToast(position: any, status: NbComponentStatus, message: string): void {
    this.toastrService.show(status, this.translateService.instant(message), { position, status, duration: 5000 });
  }
}
