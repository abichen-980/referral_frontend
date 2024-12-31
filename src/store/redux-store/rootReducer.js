import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlicer.js";
import notificationReducer from "./slices/notificationSlicer.js";

const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
});

export default rootReducer;
