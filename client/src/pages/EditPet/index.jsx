import React, { useState, useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { UpdatePet, GetMyPets } from "../../services/PetService";
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

export default function EditPet() {
  const classes = useStyles();
  const history = useHistory();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    photo: "",
    id: ""
  });

  useEffect(() => {
    async function getMyPets() {
      try {
        const data = await GetMyPets();
        setFormData(data[0]);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.error("error", e.response.data);
      }
    }

    getMyPets();
  }, []);

  useEffect(() => {
    if (!loading) {
      setLabelWidth(inputLabel.current.offsetWidth);
    }
  }, []);

  if (loading) {
    return <Typography variant="body1">Loading my pet...</Typography>;
  }

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
      await UpdatePet(formData);
      history.push("/pawfile");
    } catch (e) {
      console.error("error", e.response.data);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit my pet
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
            value={formData.name}
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
              value={formData.breed}
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
            value={formData.age}
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
            value={formData.photo}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
}
