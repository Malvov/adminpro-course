import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styles: []
})
export class SearchInputComponent implements OnInit {

  @Input() term: string;
  @Input() placeholder: string;
  @Output() outPutTerm: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }

  // searchTerm() {
  //   this.outPutTerm.emit(this.term);
  // }
}
