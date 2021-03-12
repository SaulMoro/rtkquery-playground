import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  useGetCountQuery,
  useIncrementCountMutation,
  useDecrementCountMutation,
  useCountPrefetch,
} from '../../services/counter';

const incrementMutation = useIncrementCountMutation();
const decrementMutation = useDecrementCountMutation();

// Prefetch
const prefetchCount = useCountPrefetch('getCount');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  id = new BehaviorSubject<number>(0);
  obs$ = this.id.asObservable();

  // Count Query
  countQuery$ = useGetCountQuery(this.obs$, {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({ data, isLoading, isSuccess }),
    refetchOnMountOrArgChange: true,
  });
  // Increment Mutation State
  incrementState$ = incrementMutation.state;
  // Decrement Mutation State
  decrementState$ = decrementMutation.state;

  constructor() {}

  ngOnInit() {}

  start() {
    // Simulate change arg
    this.id.next(2);
  }

  prefetch() {
    prefetchCount(2, { force: true });
  }

  increase() {
    incrementMutation.dispatch(1);
  }

  decrease() {
    decrementMutation.dispatch(1);
  }
}
