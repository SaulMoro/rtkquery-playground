import {
  Api,
  EndpointDefinitions,
  MutationDefinition,
} from '@rtk-incubator/rtk-query';
import { QueryKeys } from '@rtk-incubator/rtk-query/dist/esm/ts/core/apiState';
import { MutationActionCreatorResult } from '@rtk-incubator/rtk-query/dist/esm/ts/core/buildInitiate';
import {
  ApiEndpointMutation,
  CoreModule,
  PrefetchOptions,
} from '@rtk-incubator/rtk-query/dist/esm/ts/core/module';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  DefaultQueryStateSelector,
  GenericPrefetchThunk,
  MutationHook,
  QueryHooks,
  UseQueryStateDefaultResult,
  UseQuerySubscription,
} from './hooks-types';
import { dispatch, select } from './thunk.service';

const defaultQueryStateSelector: DefaultQueryStateSelector<any> = (
  currentState,
  lastResult
) => {
  // data is the last known good request result we have tracked - or if none has been tracked yet the last good result for the current args
  const data =
    (currentState.isSuccess ? currentState.data : lastResult?.data) ??
    currentState.data;

  // isFetching = true any time a request is in flight
  const isFetching = currentState.isLoading;
  // isLoading = true only when loading while no data is present yet (initial load with no data in the cache)
  const isLoading = !data && isFetching;
  // isSuccess = true when data is present
  const isSuccess = currentState.isSuccess || (isFetching && !!data);

  return {
    ...currentState,
    data,
    isFetching,
    isLoading,
    isSuccess,
  } as UseQueryStateDefaultResult<any>;
};

export function buildHooks<Definitions extends EndpointDefinitions>(
  api: Api<any, Definitions, any, string, CoreModule>
) {
  return { buildMutationHook, usePrefetch };

  function usePrefetch<EndpointName extends QueryKeys<Definitions>>(
    endpointName: EndpointName,
    defaultOptions?: PrefetchOptions
  ) {
    return (arg: any, options?: PrefetchOptions) =>
      dispatch(
        (api.util.prefetchThunk as GenericPrefetchThunk)(endpointName, arg, {
          ...defaultOptions,
          ...options,
        })
      );
  }

  function buildMutationHook(name: string): MutationHook<any> {
    return () => {
      console.log('entro 2');
      const { initiate, select: apiSelector } = api.endpoints[
        name
      ] as ApiEndpointMutation<
        MutationDefinition<any, any, any, any, any>,
        Definitions
      >;
      const requestId$ = new Subject<string>();
      let promiseRef: MutationActionCreatorResult<any>;

      const triggerMutation = (args: any) => {
        if (promiseRef) {
          promiseRef.unsubscribe();
        }

        promiseRef = dispatch<MutationActionCreatorResult<any>>(initiate(args));
        requestId$.next(promiseRef.requestId);

        return promiseRef;
      };

      return [
        triggerMutation,
        requestId$.pipe(
          switchMap((requestId) => select(apiSelector(requestId)))
        ),
      ];
    };
  }

  /* function buildQueryHooks(name: string): QueryHooks<any> {
    const useQuerySubscription: UseQuerySubscription<any> = (
      arg: any,
      {
        refetchOnReconnect,
        refetchOnFocus,
        refetchOnMountOrArgChange,
        skip = false,
        pollingInterval = 0,
      } = {}
    ) => {};
  } */
}
