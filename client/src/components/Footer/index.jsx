import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/core/Icon";
import FavoriteIcon from "@material-ui/core/Icon";
import LocationOnIcon from "@material-ui/core/Icon";

const Footer = () => {
  return (
    <div>
      <BottomNavigation
      //   value={value}
      //   onChange={handleChange}
      //   className={classes.root}
      >
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<LocationOnIcon />}
        />
        } />
      </BottomNavigation>
    </div>
  );
};

export default Footer;
