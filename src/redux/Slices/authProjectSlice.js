import { createSlice } from "@reduxjs/toolkit";
// Slice

const initialData = localStorage.getItem("projectData_User")
  ? JSON.parse(localStorage.getItem("projectData_User"))
  : null;

console.log("initialData", initialData);
const authProjectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: initialData,
  },
  reducers: {
    Project_Success: (state, action) => {
      state.projects = action.payload;
    },
  },
});
console.log("reducer", authProjectSlice.reducer);
console.log("actions", authProjectSlice.actions);
export const projects = authProjectSlice.reducer;

export const { Project_Success } = authProjectSlice.actions;
