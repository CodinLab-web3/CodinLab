import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  error: false,
};

export const fetchNFT = createAsyncThunk(
    "nft/fetchNFT",
    async (_, { rejectWithValue }) => {
        try {
        const response = await axios({
            method: "GET",
            url: `/api/v1/public/nft/metadata/`,
        });
        if (response.status === 200) {
            return response.data.data;
        }
        } catch (error) {
        return rejectWithValue(response.message || error.message);
        }
      }
);

export const getNftById = createAsyncThunk(
  "nft/getNftById",
  async (data, { rejectWithValue }) => {
      try {
      const response = await axios({
          method: "GET",
          url: `/api/v1/public/nft/metadata/${data}`,
      });
      if (response.status === 200) {
          return response.data.data;
      }
      } catch (error) {
      return rejectWithValue(response.message || error.message);
      }
    }
);



const nftSlice = createSlice({
  name: "nft",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
    .addCase(fetchNFT.pending, (state) => {
        state.loading = true;
        state.error = false;
    })
    .addCase(fetchNFT.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
    })
    .addCase(fetchNFT.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }) 
    .addCase(getNftById.pending, (state) => {
      state.loading = true;
      state.error = false;
  })
  .addCase(getNftById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
  })
  .addCase(getNftById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
  }) 

   
  }
});

export default nftSlice.reducer;