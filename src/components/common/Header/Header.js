import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Typography
} from "@material-ui/core";

import {
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Menu as MenuIcon
} from "@material-ui/icons";

import CustomBadge from './CustomBage';
import 'font-awesome/css/font-awesome.min.css';

import useStyles from "./styles";

export default function Header(props) {
  const classes = useStyles();
  const [patentMenu, setPatentMenu] = useState(null);
  const [isMailsUnread, setIsMailsUnread] = useState(true);
  const [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  const [profileMenu, setProfileMenu] = useState(null);

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logotype}>
            PatenTrack
        </div>
        <div className={classes.grow} />

        <IconButton
          color             = "inherit"
          className         = {classes.headerMenuButton}
        >
          18
        </IconButton>

        <IconButton
          color             = "inherit"
          aria-haspopup     = "true"
          aria-controls     = "mail-menu"
          className         = {classes.headerMenuButton}
          onClick           = {() => {
            setIsNotificationsUnread(false);
          }}
        >
          <CustomBadge
            badgeContent    = {isNotificationsUnread ? props.alertsCount : null}
            color           = "primary"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </CustomBadge>
        </IconButton>
        <IconButton
          color             = "inherit"
          aria-haspopup     = "true"
          aria-controls     = "mail-menu"
          className         = {classes.headerMenuButton}
          onClick           = {() => {
            setIsMailsUnread(false);
          }}
        >
          <CustomBadge
            badgeContent    = {isMailsUnread ? props.messagesCount : null}
            color           = "secondary"

          >
            <MailIcon classes={{ root: classes.headerIcon }} />
          </CustomBadge>
        </IconButton>
        <IconButton
          aria-haspopup     = "true"
          color             = "inherit"
          className         = {classes.headerMenuButton}
          aria-controls     = "profile-menu"
          onClick           = {() => {
            setProfileMenu(!profileMenu);
            setPatentMenu(false);
          }}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
          <div
            className = {classes.profileMenu}
            style = {{
              display: profileMenu ? 'initial' : 'none',
              width: props.width / 6
            }}
          >
            <div className={classes.profileMenuItem}>
              <span>{props.user.first_name + ' ' + props.user.last_name}</span>
            </div>
            <div className={classes.profileMenuItem}>
              <span>{props.user.organisation ? props.user.organisation.name : ''}</span>
            </div>
            <div className={classes.profileMenuItem}>
            <span onClick = {() => {props.signOut()}}>
              Sign Out
            </span>
            </div>
          </div>
        </IconButton>

        <IconButton
          aria-haspopup     = "true"
          color             = "inherit"
          className         = {classes.headerMenuButton}
          aria-controls     = "profile-menu"
          onClick           = {() => {
            setPatentMenu(!patentMenu);
            setProfileMenu(false);
          }}
        >
          <MenuIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <div
          className = {classes.patentMenu}
          style = {{
            display: patentMenu ? 'initial' : 'none',
            width: props.width / 5
          }}
        >
          <div className={classes.patentMenuItem}>
            <span>JHU CSSE</span>
          </div>
          <div className={classes.patentMenuItem}>
            <span>Mobile Version</span>
          </div>
          <div className={classes.patentMenuItem}>
            <span>Modeling COVID-19</span>
          </div>
          <div className={classes.patentMenuItem}>
            <span>
              JHU COVID-19 Resource Center
            </span>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}