import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./configuration/theme";
import Layout from "./components/Layout";
import routes from "./routes";
import { setAuthToken } from "./utils/setAuthToken";
import { useCustomerStore, Logout } from "./services/LoginService";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  const { loadUser } = useCustomerStore();

  useEffect(() => {
    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      loadUser(decoded);

      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        Logout();
        loadUser(null);
        // Redirect to login
        window.location.href = "./login";
      }
    }
  }, [loadUser]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Layout>
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
