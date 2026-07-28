import { useState } from "react";
import { useUsers } from "../hooks/useUsers";

export function CreateNewUser() {
  const { handleAddNewUser } = useUsers();
  const [result, setResult] = useState<"ok" | "error" | null>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
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

    handleAddNewUser({ name, gmail, github });
    setResult("ok");

    form.reset();
  };
  return (
    <form
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
        <input name="name" type="text" />
      </label>
      <label>
        Gmail
        <input name="gmail" type="text" />
      </label>
      <label>
        Usuario de github
        <input name="github" type="text" />
      </label>
      <button type="submit">crear usuario</button>
      <span>
        {result === "ok" && (
          <p style={{ color: "green" }}>usuario creado correctamente</p>
        )}
        {result === "error" && (
          <p style={{ color: "red" }}>error al crear usuario</p>
        )}
      </span>
    </form>
  );
}
