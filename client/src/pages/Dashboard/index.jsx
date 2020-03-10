import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import { GetMyPets } from "../../services/PetService";
import PetMiniProfile from "../../components/PetMiniProfile";

export default function Dashboard() {
  const [myPets, setMyPets] = useState(null);
  useEffect(() => {
    async function getMyPets() {
      try {
        const data = await GetMyPets();
        setMyPets(data);
      } catch (e) {
        console.log("error", e.response.data);
      }
    }

    getMyPets();
  }, []);

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
      <hr />
      {myPets && (
        <>
          <Typography component="h2" variant="h5">
            My pets
          </Typography>
          {myPets.length > 0 &&
            myPets.map(function renderPet(pet) {
              return <PetMiniProfile key={pet._id} {...pet} />;
            })}
        </>
      )}
    </Container>
  );
}
