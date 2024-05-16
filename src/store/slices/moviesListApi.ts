import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface moviesListApiState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: moviesListApiState = {
  loading: false,
  error: null,
  data: [],
};

const moviesListApiSlice = createSlice({
  name: 'moviesListApi',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      state.data = [...state.data, ...action.payload];
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {setData, setLoading, setError} = moviesListApiSlice.actions;

export default moviesListApiSlice.reducer;
