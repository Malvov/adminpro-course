import { Component, OnInit } from '@angular/core';

declare function initPlugins();

@Component({
  selector: 'app-no-page-found',
  templateUrl: './page-not-found.component.html',
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    initPlugins();
  }

}
