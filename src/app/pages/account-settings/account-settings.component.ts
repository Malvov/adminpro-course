import {Component, Inject, OnInit} from '@angular/core';

import {SettingsService} from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    public _settings: SettingsService
  ) {

  }

  ngOnInit() {
    this.setCheck();
  }

  changeColor(theme: string, link: any): void {

    this.check(link);
    this._settings.setTheme(theme);

  }

  check(link: any): void {
    let selectors: any = document.getElementsByClassName('selector');

    for (let ref of selectors) {
      ref.classList.remove('working');
    }

    link.classList.add('working');

  }

  setCheck() {

    let selectors: any = document.getElementsByClassName('selector');

    let theme = this._settings.settings.theme;

    for (let ref of selectors) {
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }

  }

}
