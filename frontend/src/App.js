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
import SkillList from "./components/skill/Skill";
import AddSkill from "./components/skill/AddSkill";
import LandingPage from "./components/landing_page/landing-page";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
