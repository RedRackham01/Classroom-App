import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isPrincipal: false,
  isStudent: false,
  isTeacher: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isPrincipal = action.payload.user.role === "Principal";
      state.isStudent = action.payload.user.role === "Student";
      state.isTeacher = action.payload.user.role === "Teacher";
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isPrincipal = false;
      state.isStudent = false;
      state.isTeacher = false;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
