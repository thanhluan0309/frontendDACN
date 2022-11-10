import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard";
import Auth from "./components/Auth/Auth";
import LayoutDNDConnectDB from "./components/LayoutConnectDB/Layout";
import LayoutDND from "./components/Layout/LayoutDND";
import { FormSendMail } from "./components/SendEmail/Sendmail";
import { HomePage } from "./components/HomePage/Homepage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth authRoute="login"></Auth>}></Route>
        <Route path="/sendmail" element={<FormSendMail></FormSendMail>}></Route>
        <Route path="/homepage" element={<HomePage></HomePage>}></Route>
        <Route
          path="/register"
          element={<Auth authRoute="Register"></Auth>}
        ></Route>
        <Route path="/Dashboard" element={<Dashboard></Dashboard>}></Route>
        {/* ///// */}
        <Route
          path="/layoutdb"
          element={<LayoutDNDConnectDB></LayoutDNDConnectDB>}
        ></Route>
        <Route path="/layoutdnd" element={<LayoutDND></LayoutDND>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
