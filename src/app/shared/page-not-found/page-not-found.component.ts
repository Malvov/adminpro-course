import { Component, OnInit } from '@angular/core';

declare function initPlugins();

@Component({
  selector: 'app-no-page-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./styles.component.css']
})
export class PageNotFoundComponent implements OnInit {

  year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    initPlugins();
  }

}
