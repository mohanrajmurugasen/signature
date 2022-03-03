import "./App.css";
import Login from "./component/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./component/dashboard/dashboard";
import Home from "./component/dashboard/home";
import Profile from "./component/dashboard/profile";
import Pendings from "./component/dashboard/pendings";
import Passbooks from "./component/dashboard/passbooks";
import QuickPays from "./component/dashboard/quickpay";

function App() {
  const user = JSON.parse(JSON.stringify(localStorage.getItem("user")));

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pending" element={<Pendings />} />
        <Route path="/passbook" element={<Passbooks />} />
        <Route path="/quickpay" element={<QuickPays />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
