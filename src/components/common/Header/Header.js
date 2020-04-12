import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";

import {
  Menu as MenuIcon
} from "@material-ui/icons";
import 'font-awesome/css/font-awesome.min.css';

import useStyles from "./styles";

export default function Header(props) {
  const classes = useStyles();
  const [profileMenu, setProfileMenu] = useState(null);

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logotype}>
            PatenTrack
        </div>
        <div className={classes.grow} />
        <IconButton
          aria-haspopup     = "true"
          color             = "inherit"
          className         = {classes.headerMenuButton}
          aria-controls     = "profile-menu"
          onClick           = {() => setProfileMenu(!profileMenu)}
        >
          <MenuIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <div
          className = {classes.headerMenu}
          style = {{
            display: profileMenu ? 'initial' : 'none'
          }}
        >
          <div className={classes.headerMenuItem}>
            <span>JHU CSSE</span>
          </div>
          <div className={classes.headerMenuItem}>
            <span>Mobile Version</span>
          </div>
          <div className={classes.headerMenuItem}>
            <span>Modeling COVID-19</span>
          </div>
          <div className={classes.headerMenuItem}>
            <span onClick = {() => {props.signOut()}}>
              Sign Out
            </span>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}