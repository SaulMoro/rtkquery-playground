import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryOptions } from 'src/app/api';
import { useGetCountQuery } from '../../services/counter';

type test = { data: any; isLoading: boolean; isUninitialized: boolean };

const selectFromResult = ({ data, isLoading, isUninitialized }: any): test => ({
  data,
  isLoading,
  isUninitialized,
});

@Component({
  selector: 'app-another',
  templateUrl: './another.component.html',
  styleUrls: ['./another.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnotherComponent implements OnInit {
  options = new BehaviorSubject<QueryOptions<test>>({ skip: true });
  options$ = this.options.asObservable();
  countQuery$ = useGetCountQuery(0, this.options$);

  skip = new BehaviorSubject<boolean>(true);
  skip$ = this.skip.asObservable();
  countSkipQuery$ = useGetCountQuery(1, this.skip$.pipe(map((skip) => ({ skip }))));

  constructor() {}

  ngOnInit(): void {}

  start(): void {
    this.options.next({ ...this.options.value, skip: false });
  }

  start2(): void {
    this.skip.next(false);
  }
}
