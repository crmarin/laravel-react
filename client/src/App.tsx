import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import "./assets/styles/index.css";
// layouts

import { AuthContext } from "./auth/AuthContext";
import Admin from "@/layouts/Admin";
import Auth from "@/layouts/Auth";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {
        <Route path="/" element={!isAuthenticated ? <Auth /> : <Admin />}>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      }
    </Routes>
  );
}

export default App;
