import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import { GetMyPets } from "../../services/PetService";

export default function Dashboard() {
  async function getMyPets(e) {
    e.preventDefault();

    try {
      const data = await GetMyPets();
      console.log("my pets are: ", data);
    } catch (e) {
      console.log("error", e.response.data);
    }
  }

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
      <Button variant="contained" color="primary" onClick={getMyPets}>
        Get my pets
      </Button>
    </Container>
  );
}
