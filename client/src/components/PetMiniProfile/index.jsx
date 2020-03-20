import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Popup from "../Popup";

const useStyles = makeStyles({
  root: {},
  media: {
    height: 280
  }
});

export default function PetMiniProfile({
  name,
  breed,
  age,
  photo,
  edit,
  user = null
}) {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);

  const handleClickOpen = () => {
    setOpenPopup(true);
  };
  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={photo} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Age: {age} year(s)
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Breed: {breed}
          </Typography>
        </CardContent>
      </CardActionArea>
      {edit && (
        <CardActions>
          <Button
            size="small"
            color="primary"
            component={RouterLink}
            to="/edit-pet"
          >
            Edit my pet
          </Button>
        </CardActions>
      )}
      {user && (
        <CardActions>
          <Button size="small" color="primary" onClick={handleClickOpen}>
            Contact owner
          </Button>
          <Popup
            handleClose={handleClose}
            openPopup={openPopup}
            title="Contact owner"
          >
            <Typography gutterBottom>
              The owner of {name} is {user.name}
            </Typography>
            <Typography gutterBottom>
              To get in touch with them, check their details below:
            </Typography>
            <Typography gutterBottom>
              Email: <a href={`mailto:${user.email}`}>{user.email}</a>
            </Typography>
          </Popup>
        </CardActions>
      )}
    </Card>
  );
}
