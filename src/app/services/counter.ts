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
      query(amount) {
        return {
          url: `increment`,
          method: 'PUT',
          body: { amount },
        };
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

export const { useGetCountQuery, useIncrementCountMutation, useDecrementCountMutation } = counterApi;