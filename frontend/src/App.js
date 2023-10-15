import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
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
import UpdatePortofolio from "./components/portofolio/EditPortofolio";
import SkillList from "./components/skill/Skill";
import AddSkill from "./components/skill/AddSkill";
import AddOrganisasi from "./components/organisasi/AddOrganisasii";
import OrganisasiList from "./components/organisasi/Organisasii";
import EditSkill from "./components/skill/EditSkill";
import LandingPage from "./components/landing_page/landing-page";
import UpdateOrganisasi from "./components/organisasi/EditOrganisasi";
import GaleriList from "./components/galeri/Galeri";
import AddGaleri from "./components/galeri/AddGaleri";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      Page Not Found
      <Link to="/">
        <button> Go to Main Page</button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
        <Route path="/pendidikan" element={<PendidikanList />} />
        <Route path="/add-pendidikan" element={<AddPendidikan />} />
        <Route path="/edit-pendidikan/:id" element={<UpdatePendidikan />} />
        <Route
          path="/organisasi"
          element={
            <>
              <OrganisasiList />
            </>
          }
        />
        <Route
          path="/add-organisasi"
          element={
            <>
              <AddOrganisasi />
            </>
          }
        />
        <Route
          path="/edit-organisasi/:id"
          element={
            <>
              <UpdateOrganisasi />
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
        <Route
          path="/edit-portofolio/:id"
          element={
            <>
              <UpdatePortofolio />
            </>
          }
        />
        <Route
          path="/skill"
          element={
            <>
              <SkillList />
            </>
          }
        />
        <Route
          path="/add-skill"
          element={
            <>
              <AddSkill />
            </>
          }
        />
        <Route path="/edit-skill/:id" element={<EditSkill />} />
        <Route path="/galeri" element={<GaleriList />} />
        <Route path="/add-galeri" element={<AddGaleri />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
