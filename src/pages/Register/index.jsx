import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    location: "",
    username: "",
    email: "",
    password: ""
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

      console.log(formData);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First name"
            name="firstname"
            autoComplete="firstname"
            onChange={onChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last name"
            onChange={onChange}
            name="lastname"
            autoComplete="lastname"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="location"
            label="Your location"
            onChange={onChange}
            name="location"
            autoComplete="location"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            onChange={onChange}
            id="username"
            autoComplete="username"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            onChange={onChange}
            name="email"
            type="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            onChange={onChange}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}
