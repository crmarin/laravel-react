import { Routes, Route, Navigate } from "react-router-dom";

import Transactions from "./views/admin/Transactions";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/styles/toastify.css';
import './assets/styles/tailwind.css';
import './assets/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
// layouts
import { ToastContainer } from 'react-toastify';

import Admin from "@/layouts/Admin";

function App() {

  return (
    <>
      <ToastContainer style={{ width: '500px' }} />
      <Routes>
        {
          <Route path="/" element={<Admin />}>
            <Route path="/transactions" element={<Transactions />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        }
      </Routes>
    </>
  );
}

export default App;
