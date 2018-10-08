import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    themeUrl: 'assets/css/colors/default-dark.css',
    theme: 'default'
  }
  constructor(@Inject(DOCUMENT) private _document) {
    this.getSettings();
  }

  setSettings(): void {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  getSettings(): void {

    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));

      this.setTheme(this.settings.theme);
    } else {
      console.log('using default settings');
    }
  }

  setTheme(theme: string): void {

    let url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme-stylesheet').setAttribute('href', url);

    this.settings.themeUrl = url;
    this.settings.theme = theme;

    this.setSettings();
  }


}

interface Settings {
  themeUrl: string;
  theme: string;
}
