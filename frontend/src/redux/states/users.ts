import { IUser } from "satelnet-types";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

interface CurrentUser {
  role: string;
}
export interface usersState {
  users: IUser[] | [];
  currentUser: CurrentUser | null;
}

const initialState: usersState = {
  users: [],
  currentUser: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUserToList: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    updateUserList: (state, action) => {
      const updateIndex = _.findIndex(
        state.users,
        (user) => user.email === action.payload.email
      );
      state.users[updateIndex] = action.payload;
    },
    loadUserList: (state, action) => {
      state.users = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { addUserToList, updateUserList, loadUserList, setCurrentUser } =
  userSlice.actions;

export default userSlice.reducer;
