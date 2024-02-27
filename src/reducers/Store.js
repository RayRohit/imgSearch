import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ImageSearch } from "./ImageSearchSlice/ImageSearchSlice";

export const store = configureStore({
  reducer: combineReducers({
    ImageSearchReducer: ImageSearch,
  }),
});
