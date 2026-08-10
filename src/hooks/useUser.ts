import { useState } from "react";
import type { User } from "../models/users";
import { getUsers } from "../services/getUsers";
import { toast } from "sonner";
import { useFetch } from "./useFetch";

export const useUser = () => {
  const [initialStateUser, setInitialStateUser] = useState<User[]>([]);
  const { loading, error } = useFetch({
    service: getUsers,
    state: initialStateUser,
    setState: setInitialStateUser,
  });

  if (error && !loading) {
    toast.error("error al cargar los usuarios");
  }

  return {
    loading,
    error,
    initialStateUser,
  };
};
