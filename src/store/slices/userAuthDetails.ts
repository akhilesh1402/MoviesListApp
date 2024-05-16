import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface userAuthDetailsState {
  isLoggedIn: boolean;
  token: string | null;
  error: string | null;
}

const initialState: userAuthDetailsState = {
  isLoggedIn: false,
  token: null,
  error: null,
};

const userAuthDetailsSlice = createSlice({
  name: 'userAuthDetails',
  initialState,
  reducers: {
    userLoginSuccess: (state, action: PayloadAction<string>) => {
      return {isLoggedIn: true, token: action.payload, error: null};
    },
    userLoginFail: (state, action: PayloadAction<string | null>) => {
      return {isLoggedIn: false, token: null, error: action.payload};
    },
    userLogout: state => {
      return initialState;
    },
  },
});

export const {userLoginSuccess, userLogout, userLoginFail} =
  userAuthDetailsSlice.actions;

export default userAuthDetailsSlice.reducer;
