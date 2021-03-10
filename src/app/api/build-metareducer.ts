import { ActionReducer, MetaReducer, Action } from '@ngrx/store';
import { Middleware, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { dispatch, getState } from './thunk.service';

export function buildMetaReducer(
  middleware: Middleware<{}, any, ThunkDispatch<any, any, AnyAction>>
): MetaReducer<any> {
  return function (reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state: any, action: Action) {
      const newState = middleware({ dispatch, getState })(() => state)(action);
      return reducer(newState, action);
    };
  };
}
