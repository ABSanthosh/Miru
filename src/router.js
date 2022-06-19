import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import * as views from "./views";
import React from "react";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/eth" component={views.Eth} />
        <Route exact path="/eth/blocks" component={views.EthBlocks} />
        <Route
          exact
          path="/eth/block/:blockNumber"
          component={views.EthBlockDetails}
        />

        <Route
          exact
          path="/eth/transactions/:blockNumber"
          component={views.EthTransactionView}
        />
        <Route
          exact
          path="/eth/address/:address"
          component={views.EthAddressView}
        />
        <Route exact path="/eth/txn" component={views.EthTransactionsView} />
        <Redirect exact from="/" to="/eth" />
      </Switch>
    </BrowserRouter>
  );
}
