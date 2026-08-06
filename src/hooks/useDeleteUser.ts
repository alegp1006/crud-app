import { useState } from "react";
import { deleteUserById } from "../services/deleteUser";
import { toast } from "sonner";

export const useDeleteUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteUser(id: string) {
    try {
      setLoading(true);
      setError(null);
      const users = await deleteUserById(id);
      toast.success(`usuario con id: ${id} eliminado`);
      return users;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("somenthing is wrong " + err.message);
        toast.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    deleteUser,
  };
};
