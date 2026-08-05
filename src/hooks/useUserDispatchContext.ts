import { useContext } from "react";
import { UsersDispatchContext } from "../context/users";

export function useUserDispatchContext() {
  const context = useContext(UsersDispatchContext);

  if (!context) {
    throw new Error("error to get the context");
  }
  return context;
}
