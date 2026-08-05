import { Toaster } from "sonner";
import "./App.css";
import { CreateNewUser } from "./components/CreateNewUser";
import { ListOfUser } from "./components/ListOfUser";
import { useUser } from "./hooks/useUser";

function App() {
  const { loading, error } = useUser();

  return (
    <main
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
      {loading && <p>cargando...</p>}
      {error && <p>error</p>}
      <ListOfUser />
      <CreateNewUser />
      <Toaster richColors />
    </main>
  );
}

export default App;
