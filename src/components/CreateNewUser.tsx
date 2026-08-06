import { useUserDispatchContext } from "../hooks/useUserDispatchContext";
import { useEditingUser } from "../hooks/useEditingUser";
import { useUpadteUser } from "../hooks/useUpdateUser";
import { useCreateUser } from "../hooks/useCreateUser";

export function CreateNewUser() {
  const dispatch = useUserDispatchContext();
  const { userToEdit, setEditingUser } = useEditingUser();
  const {
    error: createUserError,
    loading: createUserLoading,
    createUsers,
  } = useCreateUser();
  const { error, loading, updateUsers } = useUpadteUser();

  const isEditing = Boolean(userToEdit);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    const id = crypto.randomUUID();
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const gmail = formData.get("gmail") as string;
    const github = formData.get("github") as string;

    if (isEditing && userToEdit) {
      updateUsers({
        id: 1,
        title: name,
        body: gmail,
        userId: 1,
      });
      if (!error && error === null) {
        dispatch({
          type: "UPDATE_USER",
          user: {
            userID: userToEdit.userID,
            name,
            gmail,
            github,
          },
        });
      }
    } else {
      createUsers({
        userId: 1,
        title: name,
        body: gmail,
      });
      if (createUserError === null && createUserError !== "") {
        console.log(createUserError);
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

    form.reset();
  };
  return (
    <form
      key={userToEdit?.userID ?? "new"}
      onSubmit={handleSubmit}
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
        <input name="name" type="text" defaultValue={userToEdit?.name || ""} />
      </label>
      <label>
        Gmail
        <input
          name="gmail"
          type="text"
          defaultValue={userToEdit?.gmail || ""}
        />
      </label>
      <label>
        Usuario de github
        <input
          name="github"
          type="text"
          defaultValue={userToEdit?.github || ""}
        />
      </label>
      <button disabled={loading || createUserLoading} type="submit">
        {isEditing ? "Guardar Cambios" : "Crear usuario"}
      </button>

      {isEditing && (
        <button
          disabled={loading || createUserLoading}
          type="button"
          onClick={() => setEditingUser(null)}>
          Cancelar Edición
        </button>
      )}
    </form>
  );
}
