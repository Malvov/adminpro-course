import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styles: []
})
export class DoughnutGraphComponent implements OnInit {

  @Input() public chartLabels: string[];
  @Input() public chartData: number[];
  @Input() public chartType: string;
  @Input() public tag: string;

  constructor() {

  }

  ngOnInit() {
  }

}
