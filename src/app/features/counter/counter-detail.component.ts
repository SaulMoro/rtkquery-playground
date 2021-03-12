import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  useDecrementCountByIdMutation,
  useGetCountByIdQuery,
  useIncrementCountByIdMutation,
} from 'src/app/services/counter-advanced';
import { pollingOptions } from 'src/app/utils/polling-options';

@Component({
  selector: 'app-counter-detail',
  template: `
    <ng-container *ngIf="countQuery$ | async as countQuery">
      <main [class.highlight]="countQuery.isLoading">
        <span class="count">{{ countQuery.data?.count || 0 }}</span>
        <button
          *ngIf="incrementState$ | async as incrementState"
          (click)="increment(1)"
          [disabled]="incrementState?.isLoading"
        >
          +
        </button>
        <button
          *ngIf="decrementState$ | async as decrementState"
          (click)="decrement(1)"
          [disabled]="decrementState?.isLoading"
        >
          -
        </button>
        <select [ngModel]="pollingInterval$ | async" (ngModelChange)="changePollingInterval($event)">
          <option *ngFor="let pollingOption of pollingOptions" [value]="pollingOption.value">
            {{ pollingOption.label }}
          </option>
        </select>
      </main>
    </ng-container>
  `,
  styles: [
    `
      main {
        padding: 0.5em;
      }

      .count {
        color: #a74524;
        text-transform: uppercase;
        font-size: 2em;
        font-weight: 100;
        margin-right: 20px;
      }

      .highlight {
        background: #e9ffeb;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterDetailComponent implements OnInit {
  @Input() id = '';

  pollingOptions = pollingOptions;
  pollingInterval = new BehaviorSubject<number>(this.pollingOptions[0].value);
  pollingInterval$ = this.pollingInterval.asObservable();

  countQuery$: Observable<any>;

  incrementCountById = useIncrementCountByIdMutation();
  incrementState$ = this.incrementCountById.state;

  decrementCountById = useDecrementCountByIdMutation();
  decrementState$ = this.decrementCountById.state;

  constructor() {}

  ngOnInit(): void {
    this.countQuery$ = useGetCountByIdQuery(
      this.id,
      this.pollingInterval$.pipe(map((pollingInterval) => ({ pollingInterval })))
    );
  }

  changePollingInterval(interval: number) {
    this.pollingInterval.next(interval);
  }

  increment(amount: number) {
    this.incrementCountById.dispatch({ id: this.id, amount });
  }

  decrement(amount: number) {
    this.decrementCountById.dispatch({ id: this.id, amount });
  }
}
