import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  TableData: [],
  CardData: [],
  search: [],
  load: false,
  currentSearch: {
    name: null,
    image: null,
    date: null,
    base64: null,
  },
  dbData: [],
  addResponse: "",
};

export const SearchPost = createAsyncThunk(
  "ImageSearchSlice/SearchPost",
  async ({ data, navigate }, { dispatch }) => {
    try {
      dispatch(Load(true));
      const url = "http://192.168.1.98:5002/tradedetection";
      const formData = new FormData();
      formData.set("images", data.image);

      const response = await axios.post(url, formData);
      dispatch(Load(false));
      if (response.data === undefined) {
        return;
      } else {
        const TableData = response.data[0]?.TableData;
        const CardData = response.data[0]?.CardData;
        console.log("response", response.data, TableData, CardData);
        return {
          TableData,
          CardData,
          image: {
            name: data.name,
            image: data.image,
            date: data.date,
            base64: data.base64,
          },
        };
      }
    } catch (e) {
      console.error(e);
      dispatch(Load(false));
    }
  }
);

export const GetImage = createAsyncThunk(
  "ImageSearchSlice/GetImage",
  async ({}, { dispatch }) => {
    try {
      dispatch(Load(true));
      const url = "http://192.168.1.98:5002/fetchImages";
      const response = await axios.get(url);
      console.log(response.data);
      dispatch(Load(false));
      return response.data;
    } catch (e) {
      dispatch(Load(false));
      console.error(e);
      return;
    }
  }
);

export const PostImage = createAsyncThunk(
  "ImageSearchSlice/PostImage",
  async ({ data, navigate }, { dispatch }) => {
    try {
      const url = "http://192.168.1.98:5002/newimage";
      const formData = new FormData();
      formData.set("images", data.image);
      dispatch(Load(true));
      const response = await axios.post(url, formData);
      console.log("dbDtaa", response.data);
      dispatch(Load(false));
      dispatch(GetImage({}, { dispatch }));
      return response.data;
    } catch (e) {
      console.error(e);
      return {};
    }
  }
);

const ImageSearchSlice = createSlice({
  name: "ImageSearchSlice",
  initialState,
  reducers: {
    Search: (state, actions) => {},
    SetCurrent: (state, actions) => {
      console.log(actions.payload);
      actions.payload.navigate("/");
      return {
        ...state,
        currentSearch: {
          ...actions.payload.row,
        },
      };
    },
    Load: (state, actions) => {
      return {
        ...state,
        load: actions.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(SearchPost.pending, () => {})
      .addCase(SearchPost.fulfilled, (state, actions) => {
        const { TableData, CardData, image } =
          actions.payload !== undefined && actions.payload;
        console.log("actions", TableData, CardData);
        if (actions.payload !== undefined)
          return {
            ...state,
            TableData,
            CardData,
            search: [...state.search, image],
            currentSearch: image,
          };
      })
      .addCase(PostImage.pending, () => {})
      .addCase(PostImage.fulfilled, (state, actions) => {
        if (actions.payload !== undefined)
          return {
            ...state,
            addResponse: actions.payload,
          };
      })
      .addCase(GetImage.pending, () => {})
      .addCase(GetImage.fulfilled, (state, actions) => {
        if (actions.payload !== undefined)
          return {
            ...state,
            dbData: actions.payload,
          };
      });
  },
});

export const { Search, SetCurrent, Load } = ImageSearchSlice.actions;
export const ImageSearch = ImageSearchSlice.reducer;
