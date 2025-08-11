import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: 0,
    userName: "",
    email: "",
    companyId: 0,
    agentId: 0,
    agentName: "",
    isLoggedin: false,
  },
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
