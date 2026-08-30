import { useUserDispatchContext } from "../hooks/useUserDispatchContext";
import { useEditingUser } from "../hooks/useEditingUser";
import { useUpadteUser } from "../hooks/useUpdateUser";
import { useCreateUser } from "../hooks/useCreateUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserData } from "../models/schema";
import "../styles/user-form.css";

export function CreateNewUser() {
  const { userToEdit, setEditingUser } = useEditingUser();
  const dispatch = useUserDispatchContext();
  const {
    error: createUserError,
    loading: createUserLoading,
    createUsers,
  } = useCreateUser();
  const { error, loading, updateUsers } = useUpadteUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
    values: {
      name: userToEdit?.name || "",
      gmail: userToEdit?.gmail || "",
      github: userToEdit?.github || "",
    },
  });

  const isEditing = Boolean(userToEdit);

  const handleSubmitCreateUser = (data: UserData) => {
    const id = crypto.randomUUID();
    const name = data.name;
    const gmail = data.gmail;
    const github = data.github;

    if (isEditing && userToEdit) {
      updateUsers({
        id: 1,
        title: name,
        body: gmail,
        userId: 1,
      });
      if (!error || error === null) {
        dispatch({
          type: "UPDATE_USER",
          user: {
            userID: userToEdit.userID,
            name,
            gmail,
            github,
          },
        });
        setEditingUser(null);
      }
    } else {
      createUsers({
        userId: 1,
        title: name,
        body: gmail,
      });
      if (createUserError === null || createUserError !== "") {
        dispatch({
          type: "ADD_USER",
          user: {
            userID: id,
            name: name,
            gmail: gmail,
            github: github,
          },
        });
      }
    }

    reset();
  };

  return (
    <form
      className="user-form"
      key={userToEdit?.userID ?? "new"}
      onSubmit={handleSubmit(handleSubmitCreateUser)}>
      <fieldset className="user-form-fieldset">
        <label className="user-form-label">
          Nombre
          <input
            className="user-form-input"
            type="text"
            {...register("name")}
          />
          {errors?.name?.message && <p>{errors.name.message}</p>}
        </label>
        <label className="user-form-label">
          Gmail
          <input
            className="user-form-input"
            type="text"
            {...register("gmail")}
          />
          {errors?.gmail?.message && <p>{errors.gmail.message}</p>}
        </label>
        <label className="user-form-label">
          Usuario de github
          <input
            className="user-form-input"
            type="text"
            {...register("github")}
          />
          {errors?.github?.message && <p>{errors.github.message}</p>}
        </label>
      </fieldset>
      <div className="user-form-buttons">
        <button
          className="user-form-button"
          disabled={loading || createUserLoading}
          type="submit">
          {isEditing ? "Guardar Cambios" : "Crear usuario"}
        </button>

        {isEditing && (
          <button
            className="cancel-button"
            disabled={loading || createUserLoading}
            type="button"
            onClick={() => (setEditingUser(null), reset())}>
            Cancelar Edición
          </button>
        )}
      </div>
    </form>
  );
}
