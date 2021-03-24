import { Home, Detail } from "pages";

export const publicRoutes = {
  detail: {
    title: "Detail",
    path: "/:imdbID",
    exact: true,
    component: Detail,
  },
  home: {
    title: "Home",
    path: "/",
    exact: true,
    component: Home,
  },
};
