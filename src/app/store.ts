import { NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreQueryModule } from './api';
import { environment } from 'src/environments/environment';
import { counterApi } from './services/counter';
import { postApi } from './services/posts';
import auth from './features/auth/authSlice';

export type RootState = {
  [counterApi.reducerPath]: ReturnType<typeof counterApi.reducer>;
  [postApi.reducerPath]: ReturnType<typeof postApi.reducer>;
  auth: ReturnType<typeof auth>;
};

export const reducers: ActionReducerMap<RootState> = {
  [counterApi.reducerPath]: counterApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  auth,
};

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers: [counterApi.metareducer],
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreQueryModule.forRoot({ setupListeners: true }),
  ],
})
export class AppStoreModule {}
