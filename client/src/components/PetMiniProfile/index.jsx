import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {},
  media: {
    height: 140
  }
});

export default function PetMiniProfile({ name, breed, age, photo }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={photo} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name} ({age} yr(s) old)
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {breed}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
