import { api } from "..";
import { Products } from "../../Interfaces/Products";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Products[], void>({
      query: () => ({
        url: "products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation<Products, Partial<Products>>({
      query: (body) => ({
        url: "products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation } = productsApi;
