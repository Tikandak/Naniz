import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { PasswordService } from './password.service';
import { TranslateService } from '@ngx-translate/core';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'jhi-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  doNotMatch = false;
  error = false;
  success = false;
  account$?: Observable<Account | null>;
  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  formError = false;
  formErrorMsg = '';

  constructor(
    private passwordService: PasswordService,
    private accountService: AccountService,
    private translateService: TranslateService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.account$ = this.accountService.identity();
  }

  changePassword(): void {
    this.error = false;
    this.success = false;
    this.doNotMatch = false;

    const newPassword = this.passwordForm.newPassword;

    if (
      this.isPasswordOk(this.passwordForm.newPassword, 'newpassword') &&
      this.isPasswordOk(this.passwordForm.confirmPassword, 'confirmpassword')
    ) {
      this.passwordService.save(newPassword, this.passwordForm.currentPassword).subscribe(
        () => this.showToast('top-right', 'success', 'password.messages.success'),
        () => this.showToast('top-right', 'danger', 'password.messages.error')
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

  showToast(position: any, status: NbComponentStatus, message: string): void {
    this.toastrService.show(status, this.translateService.instant(message), { position, status, duration: 5000 });
  }
}
