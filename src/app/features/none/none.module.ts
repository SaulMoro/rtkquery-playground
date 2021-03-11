import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoneRoutingModule } from './none-routing.module';
import { NoneComponent } from './none.component';

@NgModule({
  declarations: [NoneComponent],
  imports: [CommonModule, NoneRoutingModule],
})
export class NoneModule {}
