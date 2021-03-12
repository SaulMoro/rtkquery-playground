import { fetchBaseQuery } from '@rtk-incubator/rtk-query';
import { createApi } from '../api';

interface CountResponse {
  count: number;
}

interface CountResponse {
  count: number;
}

export const counterApi = createApi({
  reducerPath: 'counterApi',
  baseQuery: fetchBaseQuery(),
  entityTypes: ['Counter'],
  endpoints: (build) => ({
    getCount: build.query<CountResponse, number>({
      query: (initValue) => 'count',
      provides: ['Counter'],
    }),
    incrementCount: build.mutation<CountResponse, number>({
      query: (amount) => ({ url: `increment`, method: 'PUT', body: { amount } }),
      onStart(amount: number, { dispatch, context }) {
        console.log('onStart', { dispatch, context });
        // When we start the request, just immediately update the cache
        context.undoPost = dispatch(
          counterApi.util.updateQueryResult('getCount', 0, (draft) => {
            Object.assign(draft, { count: draft.count + amount });
          })
        ).inversePatches;
      },
      onError(_, { dispatch, context }) {
        // If there is an error, roll it back
        dispatch(counterApi.util.patchQueryResult('getCount', 0, context.undoPost));
      },
      invalidates: ['Counter'],
    }),
    decrementCount: build.mutation<CountResponse, number>({
      query(amount) {
        return {
          url: `decrement`,
          method: 'PUT',
          body: { amount },
        };
      },
      invalidates: ['Counter'],
    }),
  }),
});

export const {
  useGetCountQuery,
  useIncrementCountMutation,
  useDecrementCountMutation,
  usePrefetch: useCountPrefetch,
  endpoints: counterEndpoints,
} = counterApi;
