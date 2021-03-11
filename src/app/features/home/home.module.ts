import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ChildComponent } from './child.component';

@NgModule({
  declarations: [HomeComponent, ChildComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
