import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    photo: ""
  });

  function onChange(e) {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;

    if (value) {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      // await Register(formData);
      console.log("created pawfile");
      history.push("/dashboard");
    } catch (e) {
      console.log("error", e.response.data);
    }

    console.log(formData);
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create new pawfile
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="My pet's name"
            name="name"
            autoComplete="name"
            onChange={onChange}
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="breed"
            label="Breed"
            onChange={onChange}
            name="breed"
            autoComplete="breed"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="age"
            label="Age (yrs)"
            onChange={onChange}
            name="age"
            autoComplete="age"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="photo"
            placeholder="e.g. http://image.me/my-paw-paw.jpg"
            label="Photo url"
            onChange={onChange}
            id="photo"
            autoComplete="photo"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}
