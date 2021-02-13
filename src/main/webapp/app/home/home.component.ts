import { Component, ElementRef, OnDestroy, OnInit, Renderer, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ProgressSpinnerService } from 'app/core/progres-spinner/progress-spinner.service';
import { JhiAlertService } from 'ng-jhipster';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;

  @ViewChild('username', { static: false })
  username?: ElementRef;

  authenticationError = false;

  loginForm: any;

  loading = false;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private loginService: LoginService,
    private renderer: Renderer,
    private router: Router,
    private fb: FormBuilder,
    private progressService: ProgressSpinnerService,
    private alertService: JhiAlertService,
    private toastrService: NbToastrService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.initLoginForm();
  }

  onKeyDown(event: any): void {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  initLoginForm(): void {
    this.loginForm = {
      username: '',
      password: '',
      rememberMe: false
    };
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loading = true;
    this.loginService
      .login({
        username: this.loginForm.username,
        password: this.loginForm.password,
        rememberMe: this.loginForm.rememberMe
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          if (
            this.router.url === '/account/register' ||
            this.router.url.startsWith('/account/activate') ||
            this.router.url.startsWith('/account/reset/')
          ) {
            this.router.navigate(['']);
          } else {
            this.router.navigate(['/channel/member-channel']);
          }
          this.initLoginForm();
          this.loading = false;
        },
        () => {
          this.authenticationError = true;
          this.showToast('top-right', 'info', this.translateService.instant('home.loginFail'));
          this.initLoginForm();
          this.loading = false;
        }
      );
  }

  register(): void {
    this.router.navigate(['/account/register']);
  }

  requestResetPassword(): void {
    this.router.navigate(['/account/reset', 'request']);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  showToast(position: any, status: NbComponentStatus, message: string): void {
    this.toastrService.show(status, message, { position, status });
  }
}
