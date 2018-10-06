import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  firstProgress: number = 20;
  secondProgress: number = 30;

  constructor() { }

  ngOnInit() {
  }

}
