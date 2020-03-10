import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PetsIcon from "@material-ui/icons/Pets";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { useCustomerStore, Logout } from "../../services/LoginService";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  logoParent: {
    display: "flex"
  },
  headingLink: {
    color: "white",
    display: "block",
    width: "90px",
    "&.MuiLink-underlineHover:hover": {
      textDecoration: "none"
    }
  },
  paw: {
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(1)
  }
}));

export default function Header() {
  const classes = useStyles();
  const { user, loadUser } = useCustomerStore();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    Logout();
    loadUser(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" className={classes.title}>
            <Link to="/" component={RouterLink} className={classes.headingLink}>
              <div className={classes.logoParent}>
                pawdr
                <div className={classes.paw}>
                  <PetsIcon />
                </div>
              </div>
            </Link>
          </Typography>

          {user && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My pawfile</MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout ({user.firstName})
                </MenuItem>
              </Menu>
            </div>
          )}
          {!user && (
            <Button component={RouterLink} to="/login" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
