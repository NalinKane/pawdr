import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./configuration/theme";
import Layout from "./components/Layout";
import routes from "./routes";
import { setAuthToken } from "./utils/setAuthToken";
import { useCustomerStore } from "./store";
import PrivateRoute from "./components/PrivateRoute";
import CreatePet from "./pages/CreatePet";
import Pawfile from "./pages/Pawfile";

function App() {
  const { user, loadUser, logout } = useCustomerStore();
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    async function checkAuthenticationStatus() {
      // Check for token to keep user logged in
      if (localStorage.jwtToken) {
        // Set auth token header auth
        const token = localStorage.jwtToken;
        setAuthToken(token);
        // Decode token and get user info and exp
        const decoded = jwt_decode(token);
        // Set user and isAuthenticated
        if (!user) {
          loadUser(decoded);
          setIsAuthenticating(false);
        }
        // Check for expired token
        const currentTime = Date.now() / 1000; // to get in milliseconds
        if (decoded.exp < currentTime) {
          logout();
          window.location.href = "./login";
        }
      }
      setIsAuthenticating(false);
    }

    checkAuthenticationStatus();
  }, [user]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Layout>
          {isAuthenticating && <p>loading...</p>}
          {!isAuthenticating && (
            <Switch>
              {routes.map((route, i) => (
                <Route key={i} {...route} />
              ))}
              <PrivateRoute path="/pawfile">
                <Pawfile />
              </PrivateRoute>
              <PrivateRoute path="/create-pet">
                <CreatePet />
              </PrivateRoute>
            </Switch>
          )}
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
