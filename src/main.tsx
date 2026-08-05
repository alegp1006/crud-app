import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UsersProvider } from "./context/users.tsx";
import { EditingUserProvider } from "./context/editingUser.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UsersProvider>
      <EditingUserProvider>
        <App />
      </EditingUserProvider>
    </UsersProvider>
  </StrictMode>,
);
