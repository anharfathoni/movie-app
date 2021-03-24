import React from "react";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { QueryParamProvider } from "use-query-params";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllRoute from "components/app/All-Route";
import store from "stores/configureStore";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <HelmetProvider>
            <AllRoute />
          </HelmetProvider>
        </QueryParamProvider>
      </Router>
    </Provider>
  );
}

export default App;
