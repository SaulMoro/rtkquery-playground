import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { nanoid } from '@reduxjs/toolkit';
import { useStopMutation } from 'src/app/services/counter-advanced';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent implements OnInit {
  counters: string[] = [];
  globalPollingEnabled = true;
  spookyMode = true;

  stopMutation = useStopMutation();

  constructor() {}

  ngOnInit(): void {}

  addCounter() {
    this.counters = [...this.counters, nanoid()];
  }

  toggleGlobalPolling() {
    this.globalPollingEnabled = !this.globalPollingEnabled;
  }

  spookyModeOff() {
    this.spookyMode = false;
    this.stopMutation
      .dispatch()
      .unwrap()
      .then(() => {
        this.spookyMode = false;
        this.globalPollingEnabled = false;
      });
  }
}
