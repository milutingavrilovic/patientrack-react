import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";

import {
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Dehaze as DehazeIcon
} from "@material-ui/icons";

import CustomBadge from './CustomBage';
import 'font-awesome/css/font-awesome.min.css';

import useStyles from "./styles";

import { getProfile, signOut } from "../../../actions/authActions";
import { getSiteLogo} from "../../../actions/patenTrackActions";

const menuIcon = require('../../../assets/menu_icon.svg');

function Header(props) {
  const classes = useStyles();
  const [isMailsUnread, setIsMailsUnread] = useState(true);
  const [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  const [profileMenu, setProfileMenu] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    props.getProfile().catch(err => {
      const res = {...err}.response;
      if(res !== undefined && res.status === 401 && res.data === 'Authorization error')
        setRedirect(true);
    });

    props.getSiteLogo().catch(err => {
      const res = {...err}.response;
      if(res !== undefined && res.status === 401 && res.data === 'Authorization error')
        setRedirect(true);
    });
  }, []);

  if(redirect) {
    return (<Redirect to={"/"}/>)
  }

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logotype}>
          {
            <img src={props.siteLogo} className={classes.siteLogo} alt={''}/>
          }
        </div>
        <div className={classes.headerTitle}>
          <div className={classes.headerTitleContent}>PatienTrack Significant Legal Saving</div>
        </div>

        <IconButton>
          {
            <img src={props.user.organisation ? props.user.organisation.logo : ''} className={classes.companyLogo} alt={''}/>
          }
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
        <div className={classes.logotype}>
          {
            <img src={props.user.logo} className={classes.companyLogo} alt={''}/>
          }
        </div>
        <IconButton
          aria-haspopup     = "true"
          color             = "inherit"
          className         = {classes.headerMenuButton}
          aria-controls     = "profile-menu"
          onClick           = {() => {
            setProfileMenu(!profileMenu);
          }}
        >
          <img src={menuIcon} className={classes.headerMenuIcon} />
          <div
            className = {classes.profileMenu}
            style = {{
              display: profileMenu ? 'initial' : 'none',
              minWidth: 200
            }}
          >
            <div className={classes.profileMenuItem}>
            <span onClick = {() => {}}>
              Settings
            </span>
            </div>
            <div className={classes.profileMenuItem}>
            <span onClick = {() => {props.signOut()}}>
              Sign Out
            </span>
            </div>
          </div>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    siteLogo: state.patenTrack.siteLogo.site_logo ? state.patenTrack.siteLogo.site_logo.logo_big : '/assets/images/logos/logo_white_324x82.png',
    messagesCount: state.patenTrack.messagesCount,
    alertsCount: state.patenTrack.alertsCount,
    user: state.auth.profile ? state.auth.profile.user : {},
    width: state.patenTrack.screenWidth,
    height: state.patenTrack.screenHeight
  };
};

const mapDispatchToProps = {
  getProfile,
  getSiteLogo,
  signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);