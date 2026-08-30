import type { User } from "../models/users";
import { getUsers } from "../services/getUsers";
import { toast } from "sonner";
import { useFetch } from "./useFetch";
import { useStateLocalStorage } from "./useStateLocalStorage";
import { useEffect } from "react";

const DEFAULT_USERS = [
  {
    userID: "1",
    name: "aasfdfaf",
    gmail: "example@gmail.com",
    github: "alegp",
  },
  {
    userID: "2",
    name: "pepe rodriguez",
    gmail: "peperodriguez@gmail.com",
    github: "pepe121",
  },
  {
    userID: "3",
    name: "jordi curz",
    gmail: "jordicruze@gmail.com",
    github: "jordiC",
  },
  {
    userID: "4",
    name: "martha Lulu",
    gmail: "marthaLulu@gmail.com",
    github: "lulumartha",
  },
];

export const useUser = () => {
  const [initialStateUser, setInitialStateUser] = useStateLocalStorage<User[]>({
    key: "users-crud",
    initialValue: DEFAULT_USERS,
  });
  const { loading, error, fetchData } = useFetch({
    service: getUsers,
    state: initialStateUser,
    setState: setInitialStateUser,
  });

  useEffect(() => {
    if (initialStateUser.length === 0) {
      fetchData();
    }
  }, []);

  if (error && !loading) {
    toast.error("error al cargar los usuarios");
  }

  return {
    loading,
    error,
    initialStateUser,
  };
};
