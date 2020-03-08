import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./configuration/theme";
import Layout from "./components/Layout";
import routes from "./routes";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Layout>
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Switch>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
