import React, { useState } from "react";
import MapContainer from "./MapContainer.js";
import "./SearchPlace.css";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import logo from "./tastytube_logo.png";
import { auth, db, signInWithGoogle } from "./Firebase";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

const SearchPlace = ({ searchSubmit }) => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [currentMode, setCurrentMode] = useState("search");


  auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
  });

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputText.replace(/^\s+|\s+$/g, "")) {
      alert("검색어를 입력해주세요!");
      return false;
    }

    setPlace(inputText);
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setCurrentMode(event.target.checked===true?"jjimlists":"search");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          signInWithGoogle();
          setAnchorEl(null);
          console.log(currentUser);
        }}
      >
        {currentUser ? "계정 변경" : "로그인"}
      </MenuItem>
      {currentUser ? (
        <MenuItem
          onClick={() => {
            auth
              .signOut()
              .then(() => {
                console.log("Sign-out successful");
              })
              .catch((error) => {
                console.log("ERROR :", error);
              });
            setAnchorEl(null);
          }}
        >
          로그아웃
        </MenuItem>
      ) : (
        ""
      )}
    </Menu>
  );

  return (
    <div id="contentsBox">
      <div className={classes.grow}>
        <AppBar position="fixed">
          <Toolbar>
            <img src={logo} height="52px" alt="tastytube" />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={handleSubmit}>
                <InputBase
                  placeholder="음식점을 검색해보세요!"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={onChange}
                  value={inputText}
                />
                <Button variant="contained" type="submit">
                  <b>검색</b>
                </Button>
              </form>
            </div>
            <div className={classes.grow} />
            <FormGroup>
              <FormControlLabel control={<Switch checked={currentMode==="search"?false:true} onChange={handleChange} aria-label="mode switch" />} label = "JJIMLIST" />
            </FormGroup>
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {currentUser ? (
                  <img
                    src={currentUser.photoURL}
                    style={{ width: 24, height: 24, borderRadius: 12 }}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>

      <MapContainer
        searchPlace={place}
        searchSubmit={searchSubmit}
        currentUser={currentUser}
        currentMode = {currentMode}
      />
    </div>
  );
};

export default SearchPlace;
