import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoneComponent } from './none.component';

const routes: Routes = [{ path: '', component: NoneComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoneRoutingModule { }
