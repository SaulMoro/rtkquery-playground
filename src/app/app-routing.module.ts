import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'another',
    loadChildren: () => import('./features/another/another.module').then((m) => m.AnotherModule),
  },
  { path: 'counters', loadChildren: () => import('./features/counter/counter.module').then((m) => m.CounterModule) },
  { path: 'none', loadChildren: () => import('./features/none/none.module').then((m) => m.NoneModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
