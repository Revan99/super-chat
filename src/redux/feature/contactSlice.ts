import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ContactState {
  isOpen: boolean;
}

const initialState: ContactState = {
  isOpen: false,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = contactSlice.actions;

export default contactSlice.reducer;
