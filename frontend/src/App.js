import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import DatadiriList from "./components/datadiri/Datadiri";
import AddDatadiri from "./components/datadiri/AddDatadiri";
import UpdateDatadiri from "./components/datadiri/EditDatadiri";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/data-diri"
          element={
            <>
              <Navbar />
              <DatadiriList />
            </>
          }
        />
        <Route
          path="/add"
          element={
            <>
              <Navbar />
              <AddDatadiri />
            </>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <>
              <Navbar />
              <UpdateDatadiri />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
