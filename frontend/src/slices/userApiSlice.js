import { apiSlice } from './apiSlice';

const USERS_URL = '/AuthMangaementRouter';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/authUser`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApiSlice;