import { BrowserRouter, Route, Switch } from "react-router-dom"
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import DatadiriList  from "./components/datadiri/Datadiri";
import AddDatadiri from "./components/datadiri/AddDatadiri";
import UpdateDatadiri from "./components/datadiri/EditDatadiri";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/dashboard">
          <Navbar />
          <Dashboard />
        </Route>
        <Route path="/data-diri">
          <Navbar />
          <DatadiriList />
        </Route>
        <Route path="/add">
          <Navbar />
          <AddDatadiri />
        </Route>
        <Route path="/edit/:id">
          <Navbar />
          <UpdateDatadiri />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
