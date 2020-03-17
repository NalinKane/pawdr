import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PetMiniProfile from "../../components/PetMiniProfile";
import IconButton from "@material-ui/core/IconButton";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import { MatchRequest } from "../../services/PetService";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  icon: {
    height: 32,
    width: 32
  },
  dislikeIcon: {
    background: "#da3c3c",
    padding: theme.spacing(2),
    position: "absolute",
    left: "-30px",
    top: "46%",
    zIndex: "1",
    marginTop: "-19px",
    "&:hover": {
      background: "#da3c3c"
    }
  },
  likeIcon: {
    background: "#80b234",
    padding: theme.spacing(2),
    position: "absolute",
    right: "-30px",
    top: "46%",
    zIndex: "1",
    marginTop: "-19px",
    "&:hover": {
      background: "#80b234"
    }
  }
}));

export default function Layout({ results }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { root, icon, dislikeIcon, likeIcon } = useStyles();

  function increateCounter() {
    if (currentIndex + 1 <= results.length) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  async function handleMatch(petId, match) {
    try {
      await MatchRequest(petId, match);
    } catch (e) {
      throw new Error(e);
    }
    increateCounter();
  }

  const pet = results[currentIndex];
  const showActions = currentIndex + 1 <= results.length;
  const showNoMore = currentIndex + 1 > results.length;

  return (
    <div className={root}>
      {showActions && (
        <IconButton
          aria-label="Dislike"
          className={dislikeIcon}
          onClick={() => handleMatch(pet.id, false)}
        >
          <ThumbDown className={icon} />
        </IconButton>
      )}
      {!showNoMore && (
        <div>
          <PetMiniProfile {...pet} />
        </div>
      )}
      {showNoMore && <h2>That's it for today!</h2>}
      {showActions && (
        <IconButton
          aria-label="Like"
          className={likeIcon}
          onClick={() => handleMatch(pet.id, true)}
        >
          <ThumbUp className={icon} />
        </IconButton>
      )}
    </div>
  );
}
