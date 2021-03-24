import { api } from "utils/api";

const getDetailMovie = ({ i = "" }) => {
  return api().get("/", {
    params: {
      i,
      plot: "full",
    },
  });
};

const searchMovie = ({ s = "", page = 1 }) => {
  return api().get("/", {
    params: {
      s,
      page,
    },
  });
};

const services = {
  getDetailMovie,
  searchMovie,
};

export default services;
