import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";

export default function Dashboard() {
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h3">
        Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/create-pet"
      >
        Add pet pawfile
      </Button>
    </Container>
  );
}
