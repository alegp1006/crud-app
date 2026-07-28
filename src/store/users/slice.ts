import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

interface User {
  name: string;
  gmail: string;
  github: string;
}

export interface UserWithId extends User {
  id: UserId;
}

const DEFAULT_USERS = [
  {
    id: "1",
    name: "aasfdfaf",
    gmail: "example@gmail.com",
    github: "alegp",
  },
  {
    id: "2",
    name: "pepe rodriguez",
    gmail: "peperodriguez@gmail.com",
    github: "pepe121",
  },
  {
    id: "3",
    name: "jordi curz",
    gmail: "jordicruze@gmail.com",
    github: "jordiC",
  },
  {
    id: "4",
    name: "martha Lulu",
    gmail: "marthaLulu@gmail.com",
    github: "lulumartha",
  },
];

const initialState: UserWithId[] = (() => {
  const peristedState = localStorage.getItem("__redux__state__");
  return peristedState ? JSON.parse(peristedState).user : DEFAULT_USERS;
})();

export const usersSilce = createSlice({
  name: "user",
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID();
      return [...state, { id, ...action.payload }];
    },
    deleteUserbyId: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(
        (user) => user.id === action.payload.id,
      );
      if (!isUserAlreadyDefined) {
        return [...state, action.payload];
      }
    },
  },
});

export default usersSilce.reducer;

export const { addNewUser, deleteUserbyId, rollbackUser } = usersSilce.actions;
