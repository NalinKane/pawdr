import React from "react";
import Header from "../Header/index";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

export default function Layout({ children }) {
  const { root } = useStyles();
  return (
    <>
      <CssBaseline />
      <div>
        <Header />
        <Container maxWidth="xl">
          <div className={root}>{children}</div>
        </Container>
      </div>
    </>
  );
}
