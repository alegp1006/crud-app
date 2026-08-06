import { useState } from "react";
import { createUser } from "../services/createUser";
import { toast } from "sonner";

export interface MockCreateUser {
  title: string;
  body: string;
  userId: number;
}

export const useCreateUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function createUsers(user: MockCreateUser) {
    try {
      setLoading(true);
      setError(null);
      const users = await createUser(user);
      toast.success("usuario creado");
      return users;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("somenthing is wrong" + err.message);
        toast.error("error al crear el usuario");
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    createUsers,
  };
};
