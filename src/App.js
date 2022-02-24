import "./App.css";
import Login from "./component/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./component/dashboard/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
