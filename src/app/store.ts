import { NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreQueryModule } from './api';
import { environment } from 'src/environments/environment';
import { counterApi } from './services/counter';
import { counterAdvancedApi } from './services/counter-advanced';

export type RootState = {
  [counterApi.reducerPath]: ReturnType<typeof counterApi.reducer>;
  [counterAdvancedApi.reducerPath]: ReturnType<typeof counterAdvancedApi.reducer>;
};

export const reducers: ActionReducerMap<RootState> = {
  [counterApi.reducerPath]: counterApi.reducer,
  [counterAdvancedApi.reducerPath]: counterAdvancedApi.reducer,
};

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers: [counterApi.metareducer, counterAdvancedApi.metareducer],
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreQueryModule.forRoot({ setupListeners: true }),
  ],
})
export class AppStoreModule {}
