import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

export interface UserState {
  currentUser: User | null;
  friendToChat: User | null;
}

export const userInitialState: UserState = {
  currentUser: null,
  friendToChat: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setFriendToChat: (state, action: PayloadAction<User>) => {
      state.friendToChat = action.payload;
    },
    addFriend: (state, action: PayloadAction<User>) => {
      state.currentUser?.friends.push(action.payload);
    },
    unFollowFriend: (state, actions: PayloadAction<User>) => {
      console.log(
        state.currentUser?.friends!.filter(
          (friend) => friend.name !== actions.payload.name
        )
      );
      state.currentUser!.friends = state.currentUser?.friends!.filter(
        (friend) => friend.name !== actions.payload.name
      ) as User[];
    },
  },
});

export const { setCurrentUser, setFriendToChat, addFriend, unFollowFriend } =
  userSlice.actions;

export default userSlice.reducer;
