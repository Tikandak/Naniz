import { AfterViewInit, Component, ElementRef, Renderer, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared/constants/error.constants';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.scss']
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  loading = false;
  formError = false;
  formErrorMsg = '';

  registerForm: any;

  constructor(
    private languageService: JhiLanguageService,
    private loginModalService: LoginModalService,
    private registerService: RegisterService,
    private renderer: Renderer,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: NbToastrService,
    private translateService: TranslateService
  ) {
    this.initRegisterForm();
  }

  ngAfterViewInit(): void {
    if (this.login) {
      this.renderer.invokeElementMethod(this.login.nativeElement, 'focus', []);
    }
  }

  initRegisterForm(): void {
    this.registerForm = {
      login: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    const password = this.registerForm.password;
    if (
      this.isLoginOk() &&
      this.isEmailOk() &&
      this.isPasswordOk(this.registerForm.password, 'newpassword') &&
      this.isPasswordOk(this.registerForm.confirmPassword, 'confirmpassword')
    ) {
      this.loading = true;
      const login = this.registerForm.login;
      const email = this.registerForm.email;
      this.registerService.save({ login, email, password, langKey: this.languageService.getCurrentLanguage() }).subscribe(
        () => {
          this.loading = false;
          this.initRegisterForm();
          this.showToast('top-right', 'success', 'register.messages.success');
        },
        response => {
          this.processError(response);
          this.loading = false;
        }
      );
    }
  }

  private isEmailOk(): boolean {
    let result = true;
    this.formError = false;
    this.formErrorMsg = '';
    const reg = /[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;
    if (this.registerForm.email.length < 5) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.validate.email.minlength') + '<br>';
      result = false;
    }
    if (this.registerForm.email.length > 254) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.validate.email.maxlength') + '<br>';
      result = false;
    }
    if (!reg.test(this.registerForm.email)) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.validate.email.invalid') + '<br>';
      result = false;
    }
    if (!this.registerForm.email) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.validate.email.required') + '<br>';
      result = false;
    }
    return result;
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
      (passwordKey === 'newpassword' && password !== this.registerForm.confirmPassword) ||
      (passwordKey === 'confirmpassword' && password !== this.registerForm.password)
    ) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.error.dontmatch') + '<br>';
      result = false;
    }
    return result;
  }

  private isLoginOk(): boolean {
    this.formError = false;
    this.formErrorMsg = '';
    let result = true;
    const reg = /^[_.@A-Za-z0-9-]*$/;
    if (this.registerForm.login.length < 1) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('register.messages.validate.login.minlength') + '<br>';
      result = false;
    }
    if (this.registerForm.login.length > 50) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('register.messages.validate.login.maxlength') + '<br>';
      result = false;
    }
    if (!reg.test(this.registerForm.login)) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('register.messages.validate.login.pattern') + '<br>';
      result = false;
    }
    return result;
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.showToast('top-right', 'danger', 'register.messages.error.userexists');
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.showToast('top-right', 'danger', 'register.messages.error.emailexists');
    } else {
      this.showToast('top-right', 'danger', 'register.messages.error.fail');
    }
  }

  showToast(position: any, status: NbComponentStatus, message: string): void {
    this.toastrService.show(status, this.translateService.instant(message), { position, status, duration: 6000 });
  }
}
