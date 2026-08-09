import { useUserDispatchContext } from "../hooks/useUserDispatchContext";
import { useEditingUser } from "../hooks/useEditingUser";
import { useUpadteUser } from "../hooks/useUpdateUser";
import { useCreateUser } from "../hooks/useCreateUser";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const userSchema = z.object({
  name: z
    .string()
    .min(3, "el nombre debe contener minimo 3 caracteres")
    .max(15, "el nombre debe tener como maximo 15 caracteres"),
  gmail: z.email("el gmail es incorrecto"),
  github: z
    .string()
    .min(3, "el nombre de usuario debe tener minimo 3 caracteres")
    .max(20, " el nombre de usuario debe tener maximo 20 caracteres"),
});

type UserData = z.infer<typeof userSchema>;

export function CreateNewUser() {
  const { userToEdit, setEditingUser } = useEditingUser();
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
  const dispatch = useUserDispatchContext();

  const {
    error: createUserError,
    loading: createUserLoading,
    createUsers,
  } = useCreateUser();
  const { error, loading, updateUsers } = useUpadteUser();

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
      key={userToEdit?.userID ?? "new"}
      onSubmit={handleSubmit(handleSubmitCreateUser)}
      style={{
        marginTop: "16px",
        width: "100%",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <label>
        Nombre
        <input
          //name="name"
          type="text"
          {...register("name")}
        />
        {errors?.name?.message && (
          <p style={{ color: "red" }}>{errors.name.message}</p>
        )}
      </label>
      <label>
        Gmail
        <input
          //name="gmail"
          type="text"
          {...register("gmail")}
        />
        {errors?.gmail?.message && (
          <p style={{ color: "red" }}>{errors.gmail.message}</p>
        )}
      </label>
      <label>
        Usuario de github
        <input
          //name="github"
          type="text"
          {...register("github")}
        />
        {errors?.github?.message && (
          <p style={{ color: "red" }}>{errors.github.message}</p>
        )}
      </label>
      <button disabled={loading || createUserLoading} type="submit">
        {isEditing ? "Guardar Cambios" : "Crear usuario"}
      </button>

      {isEditing && (
        <button
          disabled={loading || createUserLoading}
          type="button"
          onClick={() => (setEditingUser(null), reset())}>
          Cancelar Edición
        </button>
      )}
    </form>
  );
}
