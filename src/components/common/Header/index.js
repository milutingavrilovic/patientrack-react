import React, { useState, useRef } from "react";
import { connect } from 'react-redux';

import {
  AppBar,
  Toolbar,
  IconButton,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper,  TextareaAutosize, Typography
} from "@material-ui/core";

import {
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
} from "@material-ui/icons";

import CustomBadge from './CustomBage';
import 'font-awesome/css/font-awesome.min.css';

import useStyles from "./styles";

import { signOut } from "../../../actions/authActions";

import { getLawyers, postRecordItems, updateComment, setCurrentWidget, setSettingText } from "../../../actions/patenTrackActions";



/*import Draggable from 'react-draggable';*/

const menuIcon = require('../../../assets/menu_icon.svg');



function Header(props) {
  const classes = useStyles();
  const [isMailsUnread, setIsMailsUnread] = useState(true);
  const [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  const [profileMenu, setProfileMenu] = useState(null);
  const [fixItMenu, setFixItMenu] = useState(null);
  const lawyers = props.lawyers;
  const documents = props.documents;
  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [lawyer, setLawyer] = useState(0);
  const [document, setDocument] = useState(0);
  const [header, setHeader] = useState("Correct a Record");
  const [formId, setFormId] = useState(0);
  const ref = useRef(null);	
  const defaultValue = 0;

  const handleOpen = (t) => {

    setHeader(t == 0 ? 'Correct a Record' : 'Record an Assignment');
    setFormId( t );
    if((props.currentAsset !== "" || props.selectedRFID !== "") && t == 0) {
      setOpen(true);
    }  else if(t == 1){

      setOpen(true);
    }  
  };

  const handleCommentOpen = () => {
    if(props.currentAsset !== "" || props.selectedRFID !== "") {
      console.log("Comment");
      setOpenComment(true);
    }
  }

  const handleCommentClose = () => {
    setOpenComment(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setLawyer(event.target.value);
  };
  const handleChangeDocument = (event) => {
    setDocument(event.target.value);
  };

  let commentShow = "";
  

  

  /*const PaperComponent = (props) =>{
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  };*/

  const handleSubmitComment = ( form ) => {
    console.log("comment", form);
    /*let formData = new FormData( form );
    const asset = (props.currentAsset !== "") ? props.currentAsset : props.selectedRFID;
    const option = (props.currentAsset !== "") ? 0 : 1;
    console.log("formData",formData);
    props.postComment(formData);

    setOpenComment( false );*/

    let method = "POST";    
    let type = "asset", selectedItem = "";
    if(props.selectedRFID !== '') {
      type = 'collection';
      selectedItem = props.selectedRFID;
    } else {
      selectedItem = props.currentAsset;
    }        
    let data = new FormData(form);    
    props.updateComment(data, method, type, selectedItem);
    setOpenComment( false );
  }

  const handleSubmit = ( form ) => {
    let formData = new FormData( form );
    if(formId == 0) {
      const asset = (props.currentAsset !== "") ? props.currentAsset : props.selectedRFID;
      const option = (props.currentAsset !== "") ? 0 : 1;
      formData.append( 'asset', asset );
      formData.append( 'option', option );
    }    
    props.postRecordItems(formData, formId);
    setOpen( false );   
  };

  return (
    
    <AppBar className={classes.appBar}>
      
      <Toolbar className={classes.toolbar}>
        <div className={classes.logotype}>
          {
            <img src={props.siteLogo} className={classes.siteLogo} alt={''}/>
          }
        </div>
        <div className={classes.headerTitle}>
          <div className={classes.headerTitleContent}>PatenTrack Significant Legal Saving</div>
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
          onClick           = {() => {handleCommentOpen()}}
        >
          {
            <i className={"fad fa-comment"} title="Comment"></i>
          }
          
        </IconButton>
        <IconButton
          color             = "inherit"
          aria-haspopup     = "true"
          aria-controls     = "mail-menu"
          className         = {classes.headerMenuButton}
          onClick           = {() => {handleOpen(0)}}
        >
          {
            <i className={"fad fa-tools"} title="Fix-it"></i>
          }
          
        </IconButton>

        <IconButton
          color             = "inherit"
          aria-haspopup     = "true"
          aria-controls     = "mail-menu"
          className         = {classes.headerMenuButton}
          onClick           = {() => {
            handleOpen(1);
          }}
        >
          {
            <i className={"fad fa-file-certificate"} title="Record-it"></i>
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
          {
            props.user.logo && (
              <div className={classes.logotype}>
                <img src={props.user.logo} className={classes.companyLogo} alt={''}/>
              </div>
            )
          }
        <IconButton
          aria-haspopup     = "true"
          color             = "inherit"
          className         = {classes.headerMenuButton}
          aria-controls     = "profile-menu"
          onMouseEnter           = {() => {
            setProfileMenu(!profileMenu)
          }}
          onMouseLeave           = {() => {
            setProfileMenu(false)
          }}
        >
          <img src={menuIcon} className={classes.headerMenuIcon} alt="header menu icon" />
          <div
            className = {classes.profileMenu}
            style = {{
              display: profileMenu ? 'initial' : 'none'
            }}
          >
            <div className={classes.profileMenuItem} onClick = {() => {
              props.setSettingText(props.settingText == "Settings" ? "Close Settings" : "Settings")
              props.setCurrentWidget('settings')
            }}>
            <span>
              {props.settingText}
            </span>
            </div>
            <div className={classes.profileMenuItem} onClick = {() => {props.signOut()}}>
            <span>
              Sign Out
            </span>
            </div>
          </div>
        </IconButton>
      </Toolbar>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="draggable-dialog-title"
        maxWidth={"sm"}
        fullWidth={true}
        className={"record-modal"}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {header}
        </DialogTitle>
        <DialogContent>          
          <div>
            <form ref={ref} className={classes.root} noValidate autoComplete="off">
            {
              formId == 0 && 
              <Typography variant="h6" component="h6" className={"red"} align="left">
                { props.currentAsset !== ""
                  ? 
                  props.currentAsset 
                  : 
                  props.selectedRFID
                }
              </Typography>
            } 
            <div>              
              <div className={"MuiFormControl-root MuiTextField-root"}>
                <label className={"MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled"} >Select your professional to be assigned for this task:</label>
                <div className={"MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl"}>
                  <select value={lawyer}  onChange={handleChange} name="user_id" id="user_id"  className={`${classes.customSelect} MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input `}>   
                    <option value={defaultValue} disable={"true"}></option>           
                    {lawyers.map((option) => (
                      <option key={option.id} value={option.id}>{option.first_name} {option.first_name}</option>
                    ))}
                  </select>
                </div>
              </div>
              {
                formId == 1
                ?
                <div className={"MuiFormControl-root MuiTextField-root"}>
                  <label className={"MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled"} >Select the document to be used to record the assignment:</label>
                  <div className={"MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl"}>
                    <select value={document}  onChange={handleChangeDocument} name="document_id" id="document_id" className={`${classes.customSelect} MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input `}>   
                      <option value={defaultValue} disable={"true"}></option>           
                      {documents.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                :
                ''
              }
            </div>
              <div>
              <label className={"MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled"} >Write your instructions and click Send.</label>
              <TextareaAutosize id="comment" label="Description" name="comment" rowsMin={9}  className={classes.textarea} defaultValue={commentShow}/>         
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button autoFocus  color="primary" className={classes.btn} onClick={() => {
            handleSubmit(ref.current)
          }}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openComment}
        onClose={handleCommentClose}
        scroll={"paper"}
        aria-labelledby="draggable-dialog-title"
        maxWidth={"sm"}
        fullWidth={true}
        className={"record-modal"}
      >
        <div className={classes.customPadding}>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            {"Add a Comment"}
          </DialogTitle>
          <DialogContent>          
            <div>
              <form ref={ref} className={classes.root} noValidate autoComplete="off">              
                <div>              
                  <TextareaAutosize id="comment" label="Description" name="comment" rowsMin={9}  className={classes.textarea} defaultValue={""}/>         
                </div>
              </form>
            </div>
          </DialogContent>
          <DialogActions>
            <Button  onClick={handleCommentClose} color="secondary">
              Cancel
            </Button>
            <Button autoFocus  color="primary" className={classes.btn} onClick={() => {
              handleSubmitComment(ref.current)
            }}>
              Save
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    siteLogo: state.patenTrack.siteLogo.site_logo ? state.patenTrack.siteLogo.site_logo.logo_big : '/assets/images/logos/logo_white_324x82.png',
    messagesCount: state.patenTrack.messagesCount,
    alertsCount: state.patenTrack.alertsCount,
    user: state.auth.profile ? state.auth.profile.user : {},
    lawyers: state.patenTrack.lawyerList ? state.patenTrack.lawyerList : [],
    documents: state.patenTrack.documentList ? state.patenTrack.documentList : [],
    selectedRFID: state.patenTrack.selectedRFID,
    currentAsset: state.patenTrack.currentAsset,
    width: state.patenTrack.screenWidth,
    height: state.patenTrack.screenHeight,
    settingText: state.patenTrack.settingText ? state.patenTrack.settingText : 'Settings'
  };
};

const mapDispatchToProps = {
  signOut,
  getLawyers,
  postRecordItems,  
  updateComment,
  setSettingText,
  setCurrentWidget
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);