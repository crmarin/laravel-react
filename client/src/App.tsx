import { Routes, Route, Navigate } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import "./assets/styles/index.css";
// layouts

import Admin from "@/layouts/Admin";
import Transactions from "./views/admin/Transactions";

function App() {

  return (
    <Routes>
      {
        <Route path="/" element={<Admin />}>
          <Route path="/transactions" element={<Transactions />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      }
    </Routes>
  );
}

export default App;
