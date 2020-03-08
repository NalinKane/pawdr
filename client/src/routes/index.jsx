import Home from "../pages/Home";
import Connection from "../pages/Connection";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
  },
  {
    path: "/register",
    component: Register
  }
];

export default routes;
