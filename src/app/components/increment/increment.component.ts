import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent implements OnInit {

  @ViewChild('progressInput') progressInput: ElementRef;


  @Input() tag: string = 'Tag';

  @Input() progress: number = 0;

  @Output('updateValue') outputValue: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    // console.log('Tag', this.tag);
    // console.log('Progress', this.progress);
  }

  ngOnInit() {
    // console.log('Tag', this.tag);
    // console.log('Progress', this.progress);
  }

  changeFromInput(value: number): void {

    if (this.progress >= 100) {
      this.progress = 100;
    } else if (this.progress <= 0) {
      this.progress = 0;
    } else {
      this.progress = value;
    }


    this.progressInput.nativeElement.value = this.progress;
    this.outputValue.emit(this.progress);
  }

  changeValue(value: number): void {

    if (this.progress >= 100 && value > 0) {
      this.progress = 100;
      return;
    }

    if (this.progress <= 0 && value < 0) {
      this.progress = 0;
      return;
    }

    this.progress = this.progress + value;


    this.outputValue.emit(this.progress);

    this.progressInput.nativeElement.focus();
  }
}
