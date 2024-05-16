import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LanguageState {
  selectedLanguage: string;
}

const initialState: LanguageState = {
  selectedLanguage: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setSelectedLanguage: (state, action: PayloadAction<string>) => {
      return {selectedLanguage: action.payload};
    },
  },
});

export const {setSelectedLanguage} = languageSlice.actions;
export default languageSlice.reducer;
