import React from "react";
import { Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import map from "lodash/map";

import { publicRoutes } from "constants/routes";
import { APP_TITLE } from "constants/app";
import Layout from "components/layout";

function AllRoute() {
  return (
    <Layout>
      <Switch>
        {map(
          publicRoutes,
          ({ component: Component, title, ...routeOptions }, index) => (
            <Route {...routeOptions} key={index}>
              <Helmet title={title ? `${title} - ${APP_TITLE}` : APP_TITLE} />
              <Component {...routeOptions} />
            </Route>
          )
        )}
      </Switch>
    </Layout>
  );
}

export default AllRoute;
