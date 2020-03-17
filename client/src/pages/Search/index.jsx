import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Search } from "../../services/SearchService";
import Swiper from "../../components/Swiper";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "90%"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}));

export default function SignIn() {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    search: ""
  });
  const [searchResults, setSearchResults] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!formData.search) {
      return true;
    }
    return false;
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (validateForm()) return;

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const { data } = await Search(formData.search);
      setIsSubmitting(false);
      setSearchResults(data);
    } catch (e) {
      setIsSubmitting(false);
      console.error(e.response.data);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" gutterBottom>
          Search for pets near you
        </Typography>

        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="e.g. Shifnal"
            name="search"
            onChange={onChange}
            inputProps={{ "aria-label": "search for pets near you" }}
          />
          <IconButton
            onClick={onSubmit}
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        {searchResults && searchResults.length > 0 && (
          <Container style={{ marginTop: "24px" }}>
            <Typography variant="h5" gutterBottom>
              Search results
            </Typography>
            <Swiper results={searchResults} />
          </Container>
        )}

        {searchResults && searchResults.length === 0 && (
          <Container style={{ marginTop: "24px" }}>
            <Typography variant="h5" gutterBottom>
              No new pets found
            </Typography>
          </Container>
        )}
      </div>
    </Container>
  );
}
