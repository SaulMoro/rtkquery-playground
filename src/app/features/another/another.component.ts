import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QueryOptions } from 'src/app/api';
import { useGetCountQuery } from '../../services/counter';

type test = { data: any; isLoading: boolean; isUninitialized: boolean };

@Component({
  selector: 'app-another',
  templateUrl: './another.component.html',
  styleUrls: ['./another.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnotherComponent implements OnInit {
  options = new BehaviorSubject<QueryOptions<test>>({
    skip: true,
    selectFromResult: ({ data, isLoading, isUninitialized }) => ({
      data,
      isLoading,
      isUninitialized,
    }),
  });
  options$ = this.options.asObservable();

  countQuery$ = useGetCountQuery(0, this.options$);

  constructor() {}

  ngOnInit(): void {}

  start(): void {
    this.options.next({ ...this.options.value, skip: false });
  }
}
