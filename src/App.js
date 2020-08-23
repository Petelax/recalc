import "index.scss";

import Nav from "common/components/nav/Nav";
import store from "common/services/store";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "redux-zero/react";
import belts from "web/calculators/belts";
import chains from "web/calculators/chains";
import { URL as flywheelURL } from "web/calculators/flywheel/config";
import { URL as linearURL } from "web/calculators/linear_mech/config";
import { URL as pneumaticsURL } from "web/calculators/pneumatics/config";
import Spot from "web/calculators/spot/Spot";
import Landing from "web/landing";
import { URL as profileURL } from "web/profile";

const LinearMech = lazy(() => import("web/calculators/linear_mech/LinearMech"));
const Flywheel = lazy(() => import("web/calculators/flywheel/Flywheel"));
const Pneumatics = lazy(() => import("web/calculators/pneumatics/Pneumatics"));
const About = lazy(() => import("web/about/About"));
const Profile = lazy(() => import("web/profile/Profile"));

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <section className="section">
          <div className="container">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Landing} />

                <Route path={belts.url} component={belts.component} />
                <Route path={flywheelURL} component={Flywheel} />
                <Route path={pneumaticsURL} component={Pneumatics} />
                <Route path={linearURL} component={LinearMech} />
                <Route path={chains.url} component={chains.component} />

                <Route path={profileURL} component={Profile} />

                <Route path={"/about"} component={About} />

                <Route path={"/spot"} component={Spot} />
              </Switch>
            </Suspense>
          </div>
        </section>
      </BrowserRouter>
    </Provider>
  );
}
