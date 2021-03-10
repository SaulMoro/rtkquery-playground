import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { counterApi, useIncrementCountMutation } from './services/counter';

const prefetchCounter = counterApi.usePrefetch('getCount', { force: true });
const [incrementCount, incrementCountState$] = useIncrementCountMutation();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  data$: Observable<any> = this.store.select(
    counterApi.endpoints.getCount.select()
  );
  incrementState$ = incrementCountState$;

  constructor(public store: Store) {}

  ngOnInit() {
    counterApi.endpoints.incrementCount.useMutation();
  }

  start() {
    // counterEnpoints.getCount.start();
    prefetchCounter();
  }

  increase() {
    console.log(incrementCount(1));
    // counterEnpoints.incrementCount.start(1);
  }

  decrease() {
    // counterEnpoints.decrementCount.start(1);
  }
}
