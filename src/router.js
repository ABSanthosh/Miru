import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import * as views from "./views";
import React from "react";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/eth" component={views.Eth} />
        <Route exact path="/eth/blocks" component={views.EthBlocks} />
        <Redirect exact from="/" to="/eth" />
      </Switch>
    </BrowserRouter>
  );
}
