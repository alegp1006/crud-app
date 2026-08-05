import { useContext } from "react";
import { EditingUserContext } from "../context/editingUser";

export function useEditingUser() {
  const context = useContext(EditingUserContext);
  if (!context) {
    throw new Error("useEditingUser debe usarse dentro de EditingUserProvider");
  }
  return context;
}
