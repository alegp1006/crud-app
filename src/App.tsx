import { Toaster } from "sonner";
import "./App.css";
import { CreateNewUser } from "./components/CreateNewUser";
import { ListOfUser } from "./components/ListOfUser";

function App() {
  return (
    <main
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
      <ListOfUser />
      <CreateNewUser />
      <Toaster richColors />
    </main>
  );
}

export default App;
