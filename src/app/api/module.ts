import {
  BaseQueryFn,
  EndpointDefinitions,
  Api,
  Module,
  QueryDefinition,
  MutationDefinition,
} from '@rtk-incubator/rtk-query';
import { MetaReducer } from '@ngrx/store';

import { buildMetaReducer } from './build-metareducer';
import { buildHooks } from './build-hooks';
import { capitalize, safeAssign } from './utils';
import { QueryHooks, MutationHooks, isQueryDefinition, isMutationDefinition } from './hooks-types';
import { TS41Hooks } from './hooks-ts41-types';

export const angularHooksModuleName = Symbol();
export type AngularHooksModule = typeof angularHooksModuleName;

declare module '@rtk-incubator/rtk-query' {
  export interface ApiModules<
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    BaseQuery extends BaseQueryFn,
    Definitions extends EndpointDefinitions,
    ReducerPath extends string,
    EntityTypes extends string
  > {
    [angularHooksModuleName]: {
      endpoints: {
        [K in keyof Definitions]: Definitions[K] extends QueryDefinition<any, any, any, any, any>
          ? QueryHooks<Definitions[K]>
          : Definitions[K] extends MutationDefinition<any, any, any, any, any>
          ? MutationHooks<Definitions[K]>
          : never;
      };
    } & TS41Hooks<Definitions> & { metareducer: MetaReducer<any> };
  }
}

export const angularHooksModule = (): Module<AngularHooksModule> => ({
  name: angularHooksModuleName,
  init(api, options, context) {
    const { buildQueryHooks, buildMutationHook, usePrefetch } = buildHooks(api);
    safeAssign(api, { usePrefetch });
    safeAssign(api, {
      metareducer: buildMetaReducer(api.middleware),
    });

    return {
      injectEndpoint(endpointName, definition) {
        const anyApi = (api as any) as Api<any, Record<string, any>, string, string, AngularHooksModule>;

        if (isQueryDefinition(definition)) {
          const { useQuery, useQueryState, useQuerySubscription } = buildQueryHooks(endpointName);
          safeAssign(anyApi.endpoints[endpointName], {
            useQuery,
            useQueryState,
            useQuerySubscription,
          });
          (api as any)[`use${capitalize(endpointName)}Query`] = useQuery;
        } else if (isMutationDefinition(definition)) {
          const useMutation = buildMutationHook(endpointName);
          safeAssign(anyApi.endpoints[endpointName], {
            useMutation,
          });
          (api as any)[`use${capitalize(endpointName)}Mutation`] = useMutation;
        }
      },
    };
  },
});
