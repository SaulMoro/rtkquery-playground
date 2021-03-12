import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { useIncrementCountMutation } from '../../services/counter';

const incrementMutation = useIncrementCountMutation();

@Component({
  selector: 'app-child',
  template: ` <button (click)="increase()">Increase in child component</button>
    <h2>Increment state: {{ incrementState$ | async | json }}</h2>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements OnInit {
  incrementState$ = incrementMutation.state;

  constructor() {}

  ngOnInit(): void {}

  increase() {
    incrementMutation.dispatch(1);
  }
}
