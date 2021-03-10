import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { useIncrementCountMutation } from '../services/counter';

const [incrementCount, incrementCountState$] = useIncrementCountMutation();

@Component({
  selector: 'app-child',
  template: `
    <button (click)="increase()">Increase in child component</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  increase() {
    incrementCount(1);
  }
}
