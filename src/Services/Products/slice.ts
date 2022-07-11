import { createSlice } from "@reduxjs/toolkit";
import { productsApi } from ".";

const initialState = {
  product: {},
};

const slice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    setProduct: (state, { payload }) => ({
      ...state,
      product: payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getProducts.matchFulfilled,
      (state, actions) => {
        console.log("Passa aqui?");
      }
    );
  },
});

export const { setProduct } = slice.actions;

export default slice.reducer;
