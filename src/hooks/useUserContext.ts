import { useContext } from "react";
import { UsersContext } from "../context/users";

export function useUserContext() {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("error to get the context");
  }
  return context;
}
