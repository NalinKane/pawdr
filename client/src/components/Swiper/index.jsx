import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PetMiniProfile from "../../components/PetMiniProfile";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4)
  }
}));

/**
    1. Load all results
    2. To show 1 at a time:
        Need a selected index of the results
        As we go through the list, go through each item from n...1.
            Once the end is reached, show a message
    3. Click NAY to
        - make a post request to dislike 
        - move the index to the next one (to display another result)
    4. Click YAY to:
        - make a post request to like 
        - move the index to the next one (to display another result)
 */

export default function Layout({ results }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function increateCounter() {
    if (currentIndex + 1 < results.length) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function handleLike(petId) {
    console.log("post request for like", petId);

    increateCounter();
  }

  function handleDislike(petId) {
    console.log("post request for dislike", petId);
    increateCounter();
  }

  const pet = results[currentIndex];

  //   const { root } = useStyles();

  return (
    <div>
      <div onClick={() => handleDislike(pet.id)}>NAY</div>
      <div>
        <PetMiniProfile {...pet} />
      </div>
      <div onClick={() => handleLike(pet.id)}>YAY</div>
    </div>
  );
}
