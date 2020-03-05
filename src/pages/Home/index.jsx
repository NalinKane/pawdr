import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  dog: {
    position: "fixed",
    width: "100%",
    bottom: 0,
    left: 0,
    [theme.breakpoints.up("sm")]: {
      width: "300px"
    }
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm" disableGutters>
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Welcome to pawdr!
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Let's walk
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          World's best app for matching with your dog friends when you go for
          walkies.
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary">
                Create account
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/login"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
      <img
        src="/promo-dog.jpg"
        alt="Head of a cute dog looking at you"
        className={classes.dog}
      />
    </div>
  );
}

export default Home;
