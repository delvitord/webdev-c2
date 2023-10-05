import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
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
              <Dashboard />
            </>
          }
        />
        <Route
          path="/data-diri"
          element={
            <>
              <DatadiriList />
            </>
          }
        />
        <Route
          path="/add"
          element={
            <>
              <AddDatadiri />
            </>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <>
              <UpdateDatadiri />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
