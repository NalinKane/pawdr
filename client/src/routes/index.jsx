import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreatePet from "../pages/CreatePet";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/create-pet",
    component: CreatePet
  }
];

export default routes;
