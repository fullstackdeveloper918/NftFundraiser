import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../redux/Slices/authSlice";
import { projects } from "./Slices/authProjectSlice";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  user: authReducer,
  proj: projects,
});

const store = configureStore({
  reducer,
});

export default store;
