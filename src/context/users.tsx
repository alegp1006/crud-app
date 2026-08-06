import { createContext, useEffect, useReducer, type ReactNode } from "react";
import { userReducer } from "../reducers/userReducer";
import { type User } from "../models/users";
import { useUser } from "../hooks/useUser";
import { toast } from "sonner";

interface UserState {
  loading: boolean;
  error: string | null;
}

export type UserAction =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "DELETE_USER"; userID: string }
  | { type: "ADD_USER"; user: User }
  | { type: "UPDATE_USER"; user: User };

export const UsersContext = createContext<User[]>([]);
export const UserStateContext = createContext<UserState | null>(null);
export const UsersDispatchContext = createContext<React.ActionDispatch<
  [action: UserAction]
> | null>(null);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const { loading, error, initialStateUser } = useUser();
  const [users, dispatch] = useReducer(userReducer, []);

  useEffect(() => {
    if (initialStateUser.length > 0) {
      dispatch({ type: "SET_USERS", payload: initialStateUser });
      toast.success("usuarios cargados correctamente");
    }
  }, [initialStateUser]);

  return (
    <UsersContext.Provider value={users}>
      <UserStateContext.Provider value={{ loading, error }}>
        <UsersDispatchContext.Provider value={dispatch}>
          {children}
        </UsersDispatchContext.Provider>
      </UserStateContext.Provider>
    </UsersContext.Provider>
  );
};
