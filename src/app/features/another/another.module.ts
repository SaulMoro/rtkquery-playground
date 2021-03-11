import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnotherRoutingModule } from './another-routing.module';
import { AnotherComponent } from './another.component';


@NgModule({
  declarations: [AnotherComponent],
  imports: [
    CommonModule,
    AnotherRoutingModule
  ]
})
export class AnotherModule { }
