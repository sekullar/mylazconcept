import { useEffect } from "react";
import "./css/main.css";
import Main from "./MainComponents/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./RegistrationComponents/Register";
import { Toaster } from 'react-hot-toast';
import Login from "./RegistrationComponents/Login";
import { useNavigate } from "react-router-dom";
import AccountManager from "./RegistrationComponents/AccountManager";
import { useCookies } from "react-cookie";
import CheckInfo from "./RegistrationComponents/CheckInfo";
import { DataProvider } from "./Context/UserInfoContext";
import { DataProviderAdmin } from "./Context/AdminPanelContext";
import AdminPanel from "./AdminComponents/AdminPanel";
import NotFound from "./RegistrationComponents/NotFound";


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['uid']);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<CheckInfo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/accountManager" element={<AccountManager />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/404NotFound" element={<NotFound />} />
      </Routes>
    </>
  );
}

function MainWrapper() {
  return (
    <DataProvider>
      <DataProviderAdmin>
        <Router>
          <App />
        </Router>
      </DataProviderAdmin>
    </DataProvider>
  );
}

export default MainWrapper;
