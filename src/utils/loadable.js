import React from "react";
import LoadableComponent from "@loadable/component";
import Loading from "components/loading";

const Loadable = (callback) => {
  return LoadableComponent(callback, {
    ssr: false,
    fallback: <Loading />,
  });
};

export default Loadable;
