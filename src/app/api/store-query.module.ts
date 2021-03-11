import { ModuleWithProviders, NgModule } from '@angular/core';
import { setupListeners } from '@rtk-incubator/rtk-query';
import { defaultConfig, StoreQueryConfig, STORE_QUERY_CONFIG } from './store-query.config';
import { dispatch, ThunkService } from './thunk.service';

@NgModule({})
export class StoreQueryModule {
  static forRoot(config: Partial<StoreQueryConfig>): ModuleWithProviders<StoreQueryModule> {
    const moduleConfig = { ...defaultConfig, ...config };
    if (moduleConfig.setupListeners) {
      setupListeners(dispatch);
    }

    return {
      ngModule: StoreQueryModule,
      providers: [
        {
          provide: STORE_QUERY_CONFIG,
          useValue: moduleConfig,
        },
      ],
    };
  }

  constructor(private thunkService: ThunkService) {
    this.thunkService.init(); // Init service context
  }
}
