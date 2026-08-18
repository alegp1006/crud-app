import type { User } from "../models/users";
import { getUsers } from "../services/getUsers";
import { toast } from "sonner";
import { useFetch } from "./useFetch";
import { useStateLocalStorage } from "./useStateLocalStorage";

export const useUser = () => {
  const [initialStateUser, setInitialStateUser] = useStateLocalStorage<User[]>({
    key: "users-crud",
    initialValue: [],
  });
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
