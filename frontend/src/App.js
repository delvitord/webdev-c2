import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Dashboard from "./components/Dashboard";
import DatadiriList from "./components/datadiri/Datadiri";
import AddDatadiri from "./components/datadiri/AddDatadiri";
import UpdateDatadiri from "./components/datadiri/EditDatadiri";

import AddPendidikan from "./components/pendidikan/AddPendidikan";
import UpdatePendidikan from "./components/pendidikan/EditPendidikan";
import PendidikanList from "./components/pendidikan/Pendidikan";

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
          path="/datadiri"
          element={
            <>
              <DatadiriList />
            </>
          }
        />
        <Route
          path="/add-datadiri"
          element={
            <>
              <AddDatadiri />
            </>
          }
        />
        <Route
          path="/edit-datadiri"
          element={
            <>
              <UpdateDatadiri />
            </>
          }
        />
        <Route
          path="/pendidikan"
          element={
            <>
              <PendidikanList />
            </>
          }
        />
        <Route
          path="/add-pendidikan"
          element={
            <>
              <AddPendidikan />
            </>
          }
        />
        <Route
          path="/edit-pendidikan/:id"
          element={
            <>
              <UpdatePendidikan />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
