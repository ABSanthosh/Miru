import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import * as views from "./views";
import React from "react";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/eth" component={views.Eth} />
        <Redirect from="/" to="/eth" />
      </Switch>
    </BrowserRouter>
  );
}
