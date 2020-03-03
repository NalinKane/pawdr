import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

const NavBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            <h1 className="heading">
              pawdr <Icon>petsIcon</Icon>
            </h1>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
