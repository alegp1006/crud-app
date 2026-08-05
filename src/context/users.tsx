import { createContext, useReducer, type ReactNode } from "react";
import { initialState, userReducer } from "../reducers/userReducer";
import { type User } from "../models/users";

export type UserAction =
  | { type: "DELETE_USER"; userID: string }
  | { type: "ADD_USER"; user: User }
  | { type: "UPDATE_USER"; user: User };

export const UsersContext = createContext<User[]>([]);
export const UsersDispatchContext = createContext<React.ActionDispatch<
  [action: UserAction]
> | null>(null);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, dispatch] = useReducer(userReducer, initialState);

  return (
    <UsersContext.Provider value={users}>
      <UsersDispatchContext value={dispatch}>{children}</UsersDispatchContext>
    </UsersContext.Provider>
  );
};
