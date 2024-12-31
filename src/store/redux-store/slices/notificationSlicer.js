import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    severity: "",
  },
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    clearNotification(state) {
      state.message = "";
      state.type = "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
