import { createContext, useState, type ReactNode } from "react";
import type { User } from "../models/users";

export const EditingUserContext = createContext<{
  userToEdit: User | null;
  setEditingUser: (user: User | null) => void;
} | null>(null);

export const EditingUserProvider = ({ children }: { children: ReactNode }) => {
  const [userToEdit, setEditingUser] = useState<User | null>(null);

  return (
    <EditingUserContext.Provider value={{ userToEdit, setEditingUser }}>
      {children}
    </EditingUserContext.Provider>
  );
};
