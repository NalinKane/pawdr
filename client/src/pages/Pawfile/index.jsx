import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import { GetMyPets, GetMatches } from "../../services/PetService";
import PetMiniProfile from "../../components/PetMiniProfile";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1)
  }
}));

export default function Pawfile() {
  const [myPets, setMyPets] = useState([]);
  const [matches, setMatches] = useState([]);
  const { paper } = useStyles();

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
      <Paper className={paper}>
        <Typography variant="body1">
          Here you can create and manage your pet, see your matches and contact
          follow pawders.
        </Typography>
        {!myPets.length && (
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/create-pet"
          >
            Add a new pet
          </Button>
        )}
      </Paper>
      {myPets.length && (
        <>
          <Typography component="h2" variant="h5" gutterBottom>
            My pets
          </Typography>

          {myPets.map(function renderPet(pet) {
            return <PetMiniProfile key={pet.id} edit={true} {...pet} />;
          })}
        </>
      )}

      {matches.length > 0 && (
        <>
          <Typography component="h2" variant="h5" style={{ marginTop: "24px" }}>
            My matches
          </Typography>
          {matches.map(function renderPet(pet) {
            return <PetMiniProfile key={pet.id} {...pet} />;
          })}
        </>
      )}
    </Container>
  );
}
