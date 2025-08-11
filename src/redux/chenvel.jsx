import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "./authSlice";
import Cookies from "js-cookie";

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      "authentication/refresh",
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

const baseQuery = fetchBaseQuery({
  baseUrl: "http://server:8088/api/",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = Cookies.get("access_token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const chenvelApi = createApi({
  reducerPath: "chenvelApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Orders", "PickUps", "Packages"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (login) => ({
        url: `/user/login`,
        method: "POST",
        body: login,
      }),
    }),
    getOrders: builder.query({
      query: ({ start, length }) =>
        `/emptybox/customer/filter?start=${start}&length=${length}`,
      providesTags: ["Orders"],
    }),
    getPickUps: builder.query({
      query: ({ start, length }) =>
        `/pickup/customer/filter?start=${start}&length=${length}`,
      providesTags: ["PickUps"],
    }),
    getPackages: builder.query({
      query: ({ start, length }) =>
        `/package/customer/filter?start=${start}&length=${length}`,
      providesTags: ["Packages"],
    }),
    addPickUp: builder.mutation({
      query: (pickup) => ({
        url: "/pickup/addCustomerPickUp",
        method: "POST",
        body: pickup,
      }),
      invalidatesTags: (result, error, arg) => {
        if (!error) return ["PickUps"];
      },
    }),
    addEmptyBox: builder.mutation({
      query: (pickup) => ({
        url: "/emptybox/addCustomerEmptyBox",
        method: "POST",
        body: pickup,
      }),
      invalidatesTags: (result, error, arg) => {
        if (!error) return ["PickUps"];
      },
    }),
    getTownByPostal: builder.query({
      query: (postalCode) => `/towns/postal/${postalCode}`,
    }),
    getStates: builder.query({
      query: (countryId) => `/states/${countryId}`,
    }),
    getCities: builder.query({
      query: (stateId) => `/cities/${stateId}`,
    }),
    getTowns: builder.query({
      query: (cityId) => `/towns/${cityId}`,
    }),
    getOrder: builder.query({
      query: (id) => `/emptybox/${id}`,
    }),
    getPickUp: builder.query({
      query: (id) => `/pickup/${id}`,
    }),
    updateOrder: builder.mutation({
      query: ({ id, order }) => ({
        url: `/emptybox/customer/update/${id}`,
        method: "PUT",
        body: order,
      }),
      invalidatesTags: (result, error, arg) => {
        if (!error) return ["Orders"];
      },
    }),
    updatePickUp: builder.mutation({
      query: ({ id, pickup }) => ({
        url: `/pickup/customer/update/${id}`,
        method: "PUT",
        body: pickup,
      }),
      invalidatesTags: (result, error, arg) => {
        if (!error) return ["PickUps"];
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLazyGetOrdersQuery,
  useLazyGetPickUpsQuery,
  useAddPickUpMutation,
  useAddEmptyBoxMutation,
  useLazyGetTownByPostalQuery,
  useLazyGetStatesQuery,
  useLazyGetCitiesQuery,
  useLazyGetTownsQuery,
  useLazyGetOrderQuery,
  useLazyGetPickUpQuery,
  useUpdateOrderMutation,
  useUpdatePickUpMutation,
  useLazyGetPackagesQuery,
} = chenvelApi;
