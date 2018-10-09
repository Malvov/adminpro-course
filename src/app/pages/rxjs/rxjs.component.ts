import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
   this.subscription = this.backToObservable().pipe(
      retry(2)
    ).subscribe(
      value => console.log('Subs', value),
      error => console.log('Error', error),
      () => console.log('El observador termino')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('página cerrada');
  }

  backToObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter++;
        const returnValue = {
          value: counter
        };
        observer.next(returnValue);

        // if (counter === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }

        // if (counter === 2) {
        //   // clearInterval(interval);
        //   observer.error('Auxilio');
        // }
        }, 1000);
      }).pipe(
        map( response => response.value ),
        filter( (response, index) => {
          if ( (response % 2) === 1) {
            // impar
            return true;
          } else {
            return false;
          }
        })
      );
  }

}
