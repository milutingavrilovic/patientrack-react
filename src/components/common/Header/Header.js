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
} from "@material-ui/icons";
import CustomBadge from './CustomBage';

import useStyles from "./styles";

export default function Header(props) {
  const classes = useStyles();

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
          onClick           = {e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id                = "profile-menu"
          open              = {Boolean(profileMenu)}
          anchorEl          = {profileMenu}
          onClose           = {() => setProfileMenu(null)}
          className         = {classes.headerMenu}
          classes           = {{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4">
              {props.user.first_name + ' ' + props.user.last_name}
            </Typography>
            <Typography
              className     = {classes.profileMenuLink}
              component     = "a"
              color         = "primary"
            >
              {props.user.organisation ? props.user.organisation.name : ''}
            </Typography>
          </div>
          <div className={classes.profileMenuUser}>
            <Typography
              className     = {classes.profileMenuLink}
              color         = "primary"
              onClick       = {() => {
                props.signOut()
              }}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}