import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UseQueryOptions } from 'src/app/api/hooks-types';
import { useGetCountQuery } from 'src/app/services/counter';

@Component({
  selector: 'app-another',
  templateUrl: './another.component.html',
  styleUrls: ['./another.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnotherComponent implements OnInit {
  options = new BehaviorSubject<UseQueryOptions<any, any>>({ skip: true });
  options$ = this.options.asObservable();

  countQuery$ = useGetCountQuery(0, this.options$);

  constructor() {}

  ngOnInit(): void {}

  start(): void {
    this.options.next({ skip: false });
  }
}
