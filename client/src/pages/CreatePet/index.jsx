import React, { useState, useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { CreateNewPet } from "../../services/PetService";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { dogBreeds } from "../../configuration/dogBreeds";

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
  },
  formControl: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }
}));

export default function CreatePet() {
  const classes = useStyles();
  const history = useHistory();

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

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

  function validateForm() {
    if (!formData.name && !formData.breed && !formData.age && !formData.photo) {
      return true;
    }
    return false;
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (validateForm()) return;

    try {
      await CreateNewPet(formData);
      history.push("/pawfile");
    } catch (e) {
      console.error("error", e.response.data);
    }
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

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="breed">
              Breed
            </InputLabel>
            <Select
              native
              onChange={onChange}
              labelWidth={labelWidth}
              inputProps={{
                name: "breed",
                id: "breed"
              }}
            >
              <option value="" />
              {dogBreeds.map((breed, i) => (
                <option key={`${breed}-${i}`} value={breed}>
                  {breed}
                </option>
              ))}
            </Select>
          </FormControl>
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
