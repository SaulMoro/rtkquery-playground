import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  counterApi,
  useGetCountQuery,
  useIncrementCountMutation,
  useDecrementCountMutation,
} from '../../services/counter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  id = new BehaviorSubject<number>(0);
  obs$ = this.id.asObservable();
  countQuery$ = useGetCountQuery(this.obs$);

  incrementMutation = useIncrementCountMutation();
  incrementState$ = this.incrementMutation.state;

  decrementMutation = useDecrementCountMutation();
  decrementState$ = this.decrementMutation.state;

  constructor() {}

  ngOnInit() {}

  start() {
    this.id.next(2);
  }

  prefetch() {
    counterApi.usePrefetch('getCount', { force: true });
  }

  increase() {
    this.incrementMutation.dispatch(1);
  }

  decrease() {
    this.decrementMutation.dispatch(1);
  }
}
