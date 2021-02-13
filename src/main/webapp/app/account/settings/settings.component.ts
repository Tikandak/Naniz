import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { TranslateService } from '@ngx-translate/core';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'jhi-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  account!: Account;
  success = false;
  settingsForm = {
    firstName: '',
    lastName: '',
    email: ''
  };
  loading = false;
  formError = false;
  formErrorMsg = '';

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private languageService: JhiLanguageService,
    private translateService: TranslateService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.settingsForm.firstName = account.firstName;
        this.settingsForm.lastName = account.lastName;
        this.settingsForm.email = account.email;
        this.account = account;
      }
    });
  }

  save(): void {
    this.success = false;

    if (
      this.isEmailOk() &&
      this.isNameFileldOk(this.settingsForm.firstName, 'firstname') &&
      this.isNameFileldOk(this.settingsForm.lastName, 'lastname')
    ) {
      this.account.firstName = this.settingsForm.firstName;
      this.account.lastName = this.settingsForm.lastName;
      this.account.email = this.settingsForm.email;

      this.accountService.save(this.account).subscribe(() => {
        this.success = true;
        this.accountService.authenticate(this.account);
        this.showToast('top-right', 'success', 'settings.messages.success');
      });
    }
  }

  private isNameFileldOk(fieldValue: string, fieldName: string): boolean {
    this.formError = false;
    this.formErrorMsg = '';
    let result = true;
    if (fieldValue.length < 1) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('settings.messages.validate.' + fieldName + '.minlength') + '<br>';
      result = false;
    }
    if (fieldValue.length > 50) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('settings.messages.validate.' + fieldName + '.maxlength') + '<br>';
      result = false;
    }
    return result;
  }

  private isEmailOk(): boolean {
    let result = true;
    this.formError = false;
    this.formErrorMsg = '';
    const reg = /[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;
    if (this.settingsForm.email.length < 5) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.validate.email.minlength') + '<br>';
      result = false;
    }
    if (this.settingsForm.email.length > 254) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.validate.email.maxlength') + '<br>';
      result = false;
    }
    if (!reg.test(this.settingsForm.email)) {
      this.formError = true;
      this.formErrorMsg += this.translateService.instant('global.messages.validate.email.invalid') + '<br>';
      result = false;
    }
    if (!this.settingsForm.email) {
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
