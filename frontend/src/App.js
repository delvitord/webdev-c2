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
import PortofolioList from "./components/portofolio/Portofolio"; 
import AddPortofolio from "./components/portofolio/AddPortofolio";

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
          path="/edit/:id"
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
        <Route
          path="/portofolio"
          element={
            <>
              <PortofolioList />
            </>
          }
        />
        <Route
          path="/add-portofolio"
          element={
            <>
              <AddPortofolio />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
