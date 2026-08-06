import { useEffect, useState } from "react";
import type { User } from "../models/users";
import { getUsers } from "../services/getUsers";
import { toast } from "sonner";

export const useUser = () => {
  const [initialStateUser, setInitialStateUser] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getAllUsers() {
      try {
        setLoading(true);
        setError(null);
        const users: User[] = await getUsers();
        setInitialStateUser(users);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError("somenthing is wrong" + err.message);
          toast.error("error al cargar los usuarios");
        }
      } finally {
        setLoading(false);
      }
    }

    getAllUsers();
  }, []);
  return {
    loading,
    error,
    initialStateUser,
  };
};
