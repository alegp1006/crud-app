import { addNewUser, deleteUserbyId, type UserId } from "../store/users/slice";
import type { User } from "../types/types";
import { useAppDispatch } from "./store";

export function useUsers() {
  const dispatch = useAppDispatch();

  const handleAddNewUser = ({ name, gmail, github }) => {
    dispatch(addNewUser({ name, gmail, github }));
  };

  const handleDeleteUser = (id: UserId) => {
    dispatch(deleteUserbyId(id));
  };

  return { handleAddNewUser, handleDeleteUser };
}
