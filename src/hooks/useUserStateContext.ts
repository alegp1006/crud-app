import { useContext } from "react";
import { UserStateContext } from "../context/users";

export const useUserStateContext = () => {
  const context = useContext(UserStateContext);

  if (!context) {
    throw new Error("error provider in userStateContext");
  }
  return context;
};
