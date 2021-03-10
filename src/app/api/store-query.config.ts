import { InjectionToken } from '@angular/core';

export interface StoreQueryConfig {
  setupListeners: boolean;
}

export const defaultConfig: StoreQueryConfig = {
  setupListeners: false,
};

export const STORE_QUERY_CONFIG = new InjectionToken<StoreQueryConfig>(
  'STORE_QUERY_CONFIG'
);
