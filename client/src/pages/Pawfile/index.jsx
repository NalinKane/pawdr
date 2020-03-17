import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import { GetMyPets, GetMatches } from "../../services/PetService";
import PetMiniProfile from "../../components/PetMiniProfile";

export default function Pawfile() {
  const [myPets, setMyPets] = useState(null);
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    async function getMyPets() {
      try {
        const data = await GetMyPets();
        setMyPets(data);
      } catch (e) {
        console.error("error", e.response.data);
      }
    }

    getMyPets();
  }, []);

  useEffect(() => {
    async function getMatches() {
      try {
        const { data } = await GetMatches();

        setMatches(data);
      } catch (e) {
        console.error("error", e.response.data);
      }
    }

    getMatches();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h3">
        My Pawfile
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/create-pet"
      >
        Add a new pet
      </Button>
      <hr />
      {myPets && (
        <>
          <Typography component="h2" variant="h5">
            My pets
          </Typography>
          {myPets.length > 0 &&
            myPets.map(function renderPet(pet) {
              return <PetMiniProfile key={pet.id} {...pet} />;
            })}
        </>
      )}

      {matches && matches.length > 0 && (
        <>
          <Typography component="h2" variant="h5" style={{ marginTop: "24px" }}>
            My matches
          </Typography>
          {matches.length > 0 &&
            matches.map(function renderPet(pet) {
              return <PetMiniProfile key={pet.id} {...pet} />;
            })}
        </>
      )}
    </Container>
  );
}
