import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { rollbackUser, usersSilce } from "./users/slice";
import { toast } from "sonner";
import type { User } from "../types/types";

const persistedLocalStorageMiddelware: Middleware =
  (store) => (next) => (action) => {
    next(action);
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
  };

const syncWithDatabaseMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type, payload } = action;
    const previusState = store.getState();
    const userToRemove = previusState.user.find(
      (user: User) => user.id === payload,
    );

    console.log({ type, payload });
    console.log({ action, state: store.getState() });

    if (type === "user/deleteUserbyId") {
      const userToRemove = previusState.user.find(
        (user: User) => user.id === payload,
      );

      fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) toast.success("usuario eliminado correctamente");
        })
        .catch((err) => {
          toast.error(`error al eliminar el usuario con id: ${payload}`);
          if (userToRemove) store.dispatch(rollbackUser(userToRemove));
          console.log(err);
        });
    }
    next(action);
  };
export const store = configureStore({
  reducer: {
    user: usersSilce.reducer,
  },
  middleware: (gDM) =>
    gDM().concat(persistedLocalStorageMiddelware, syncWithDatabaseMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDistpatch = typeof store.dispatch;
