import React from "react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import Camera from "./pages/Camera";
import CameraCreate from "./pages/Camera/Create";
import Notfound from "./pages/notfound";

const router = () => (
  <Router>
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/camera">Camera</Link>
          </li>
          <li>
            <Link to="/camera/create">Create Camera</Link>
          </li>
        </ul>
        <Switch>
          <Route exact={true} path="/camera" component={Camera} />
          <Route exact={true} path="/camera/create" component={CameraCreate} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  </Router>
);

export default router;
