import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  useGetCountQuery,
  useIncrementCountMutation,
  useDecrementCountMutation,
  useCountPrefetch,
} from '../../services/counter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  id = new BehaviorSubject<number>(0);
  obs$ = this.id.asObservable();

  // Count Query
  countQuery$ = useGetCountQuery(this.obs$);

  // Increment Mutation
  incrementMutation = useIncrementCountMutation();
  incrementState$ = this.incrementMutation.state;

  // Decrement Mutation
  decrementMutation = useDecrementCountMutation();
  decrementState$ = this.decrementMutation.state;

  // Prefetch
  prefetchCount = useCountPrefetch('getCount');

  constructor() {}

  ngOnInit() {}

  start() {
    // Simulate change arg
    this.id.next(2);
  }

  prefetch() {
    this.prefetchCount(2, { force: true });
  }

  increase() {
    this.incrementMutation.dispatch(1);
  }

  decrease() {
    this.decrementMutation.dispatch(1);
  }
}
