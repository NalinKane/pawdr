import Home from "../pages/Home";
import Connection from "../pages/Connection";
import Login from "../pages/Login";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/connection",
    component: Connection
  },
  {
    path: "/login",
    component: Login
  }
];

export default routes;
