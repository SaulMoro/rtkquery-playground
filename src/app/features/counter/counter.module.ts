import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CounterRoutingModule } from './counter-routing.module';
import { CounterComponent } from './counter.component';
import { CounterDetailComponent } from './counter-detail.component';

@NgModule({
  declarations: [CounterComponent, CounterDetailComponent],
  imports: [CommonModule, CounterRoutingModule, FormsModule, ReactiveFormsModule],
})
export class CounterModule {}
