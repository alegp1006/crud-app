import { useState } from "react";
import { toast } from "sonner";
import { useUserDispatchContext } from "../hooks/useUserDispatchContext";
import { useEditingUser } from "../hooks/useEditingUser";

export function CreateNewUser() {
  const dispatch = useUserDispatchContext();
  const { userToEdit, setEditingUser } = useEditingUser();
  const [result, setResult] = useState<"ok" | "error" | null>(null);

  const isEditing = Boolean(userToEdit);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    const id = crypto.randomUUID();
    e.preventDefault();

    setResult(null);

    const form = e.target;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const gmail = formData.get("gmail") as string;
    const github = formData.get("github") as string;

    if (!name || !gmail || !github) {
      return setResult("error");
    }

    if (isEditing && userToEdit) {
      dispatch({
        type: "UPDATE_USER",
        user: {
          userID: userToEdit.userID,
          name,
          gmail,
          github,
        },
      });
    } else {
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

    setResult("ok");
    toast("usuario creado :)");

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
      <button type="submit">
        {isEditing ? "Guardar Cambios" : "Crear usuario"}
      </button>

      {isEditing && (
        <button type="button" onClick={() => setEditingUser(null)}>
          Cancelar Edición
        </button>
      )}
      <span>
        {result === "ok" && (
          <p style={{ color: "green" }}>
            {isEditing
              ? "Usuario editado correctamente"
              : "Usuario creado correctamente"}
          </p>
        )}
        {result === "error" && (
          <p style={{ color: "red" }}>Error al procesar usuario</p>
        )}
      </span>
    </form>
  );
}
