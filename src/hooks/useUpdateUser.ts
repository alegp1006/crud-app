import { useState } from "react";
import { upadteUserById } from "../services/updateUser";
import { toast } from "sonner";

export interface MockUser {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const useUpadteUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function updateUsers(user: MockUser) {
    try {
      setLoading(true);
      setError(null);
      const users = await upadteUserById(user);
      toast.success("usuario actualizado correctamente");
      return users;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("somenthing is wrong" + err.message);
        toast.error("error al actualizar el usuario" + error);
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    updateUsers,
  };
};
