import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/core/login/login.service';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  menuItems: NbMenuItem[] = [];

  constructor(
    private accountService: AccountService,
    private menuService: NbMenuService,
    private loginService: LoginService,
    private languageService: JhiLanguageService,
    private sessionStorage: SessionStorageService,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createMenu();
    this.menuService.onItemClick().subscribe(item => {
      if (item.item.data === 'logout') {
        this.logout();
      }
    });
  }

  createMenu(): void {
    this.menuItems.push({
      title: this.translateService.instant('global.menu.home'),
      icon: 'home-outline',
      link: '/',
      home: true,
      pathMatch: 'full',
      hidden: true
    });

    if (this.accountService.hasAnyAuthority('ROLE_MEMBER')) {
      this.menuItems.push(
        {
          title: this.translateService.instant('publicChannel.title'),
          icon: 'people-outline',
          link: '/channel/public-channel',
          pathMatch: 'prefix',
          hidden: true
        },
        {
          title: this.translateService.instant('memberChannel.title'),
          icon: 'checkmark-circle-outline',
          link: '/channel/member-channel',
          pathMatch: 'prefix'
        }
      );
    }

    if (this.accountService.hasAnyAuthority('ROLE_PREMIUM')) {
      this.menuItems.push({
        title: this.translateService.instant('privateChannel.title'),
        icon: 'lock-outline',
        link: '/channel/private-channel',
        pathMatch: 'prefix',
        hidden: true
      });
    }

    if (this.accountService.hasAnyAuthority('ROLE_ADMIN')) {
      this.menuItems.push({
        title: this.translateService.instant('global.menu.admin.main'),
        expanded: false,
        icon: 'settings',
        children: [
          {
            title: this.translateService.instant('global.menu.admin.userManagement'),
            link: '/admin/user-management',
            pathMatch: 'prefix'
          },
          {
            title: this.translateService.instant('global.menu.admin.tracker'),
            link: '/admin/tracker',
            pathMatch: 'prefix'
          },
          {
            title: this.translateService.instant('global.menu.admin.metrics'),
            link: '/admin/metrics',
            pathMatch: 'prefix'
          },
          {
            title: this.translateService.instant('global.menu.admin.health'),
            link: '/admin/health',
            pathMatch: 'prefix'
          },
          {
            title: this.translateService.instant('global.menu.admin.configuration'),
            link: '/admin/configuration',
            pathMatch: 'prefix'
          },
          {
            title: this.translateService.instant('global.menu.admin.audits'),
            link: '/admin/audits',
            pathMatch: 'prefix'
          },
          {
            title: this.translateService.instant('global.menu.admin.logs'),
            link: '/admin/logs',
            pathMatch: 'prefix'
          }
        ]
      });
    }

    this.menuItems.push({
      title: this.translateService.instant('global.menu.account.main'),
      expanded: false,
      icon: 'person',
      children: [
        {
          title: this.translateService.instant('global.menu.account.settings'),
          icon: 'person-outline',
          link: '/account/settings',
          pathMatch: 'prefix'
        },
        {
          title: this.translateService.instant('global.menu.account.password'),
          icon: 'unlock-outline',
          link: '/account/password',
          pathMatch: 'prefix'
        },
        {
          title: this.translateService.instant('global.menu.account.logout'),
          icon: 'power-outline',
          data: 'logout',
          link: ''
        }
      ]
    });
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  getImageUrl(): string {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : '';
  }
}
