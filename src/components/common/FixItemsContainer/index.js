import React, { useState } from "react";
import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher";
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';
import Loader from "../Loader";
import TabsContainer from "../Tabs";
import CustomTab from "../CustomTab";
import {getRecordItems, getLawyers, setFixItTabIndex, postRecordItems} from "../../../actions/patenTrackActions";
/** Changes by Vikas */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextareaAutosize, TextField  } from '@material-ui/core';

function PaperComponent(props) {
  /*return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );*/
  return (
    <Paper {...props} />
  );
}


function FixItemsContainer(props) {
  const { fixitTab, setFixItTabIndex } = props;
  const classes = useStyles();
  const isExpanded = props.currentWidget === 'fixItems';
  const [showSwitcher, setShowSwitcher] = useState(0);  
  /**Changes by Vikas */
  const [open, setOpen] = useState(false);
  const [lawyer, setLawyer] = useState(0);
  const [asset, setAsset] = useState("");
  const [comment, setComment] = useState("");
  const defaultValue = 0;

  const lawyers = props.lawyers;
  console.log("lawyers", lawyers);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    /*console.log(lawyer, asset, comment);
    const params = {asset, comment};
    params.user_id = lawyer;
    const data = Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');*/
    let data = new FormData();

    data.append('asset', asset);
    data.append('comment', comment);
    data.append('user_id', lawyer);
    console.log("FOMRDATA", data);
    props.postRecordItems(data, 0);
  }
  console.log("props.shareUrl", props.shareUrl);
  if(props.shareUrl !== '') {
    handleClose();
  }

  const handleChange = (event) => {
    setLawyer(event.target.value);
  };

  const handleAssetChange = (event) => {
    setAsset(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const renderItemList = ( type ) => {
    if(!isExpanded) {
      /*console.log(" ITEMSSSS", props.fixItemList);*/
      return (
        <div className={classes.column}>
        {
          props.fixItemList[type]
            ?
            props.fixItemList[type].map(item => {
              const createdAt = (type === 'todo') ? new Date(item.created_at): new Date(item.updated_at);

              return (
                <div
                  key={item.id}
                  className={classes.columnItem}
                >
                  <div className={classnames(classes.telephone, classes.gridItem)}>
                    {item.company_lawyer.telephone}
                  </div>
                  <div className={classnames(classes.created_dt, classes.gridItem)}>
                    {new Intl.DateTimeFormat('en-US').format(createdAt)}
                  </div>
                  <div className={classnames(classes.name, classes.gridItem)}>
                    {item.company_lawyer.first_name + ' ' + item.company_lawyer.last_name}
                  </div>
                </div>
              )
            })
            :
            ''
        }
      </div>);
    }
    return (
      <div className={classes.row}>
        <div className={classes.rowItem}>
          <span className={classes.gridItemExpand}>Id</span>
          <span className={classes.gridItemExpand}>Asset</span>
          <span className={classes.gridItemExpand}>LawyerId</span>
          <span className={classes.gridItemExpand}>Comment</span>
          <span className={classes.gridItemExpand}>Company Name</span>
          <span className={classes.gridItemExpand}>Telephone</span>
          <span className={classes.gridItemExpand}>Created At</span>
          <span className={classes.gridItemExpand}>EmailAddress</span>
        </div>
        {
          props.fixItemList[type]
            ?
            props.fixItemList[type].map(item => {
              const createdAt = new Date(item.created_at);

              return (
                <div
                  key={item.id}
                  className={classes.rowItem}
                >
                  <div className={classes.gridItemExpand}>
                    {item.id}
                  </div>
                  <div className={classes.gridItemExpand}>
                    {item.asset}
                  </div>
                  <div className={classes.gridItemExpand}>
                    {item.lawyer_id}
                  </div>
                  <div className={classes.gridItemExpand}>
                    {item.comment}
                  </div>
                  <div className={classes.gridItemExpand}>
                    {item.company_lawyer.first_name + ' ' + item.company_lawyer.last_name}
                  </div>

                  <div className={classes.gridItemExpand}>
                    {item.company_lawyer.telephone}
                  </div>
                  <div className={classes.gridItemExpand}>
                    {new Intl.DateTimeFormat('en-US').format(createdAt)}
                  </div>
                  <div className={classes.gridItemExpand}>
                    {item.company_lawyer.email_address}
                  </div>
                </div>
              )
            })
            :
            ''
        }
      </div>
    );
  };

  return (
    <div
      className     = {classes.fixItemsContainer}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.container}>
        {
          fixitTab === 0 &&
          <div className={classes.context}>
          <span
            className={classes.headerWrapper}
            style={{minHeight: props.isLoading ? 80 : 'initial'}}
          >
            {
              props.isLoading
                ?
                <Loader/>
                :
                <div className={classes.header} style={{ fontSize: '1rem' }}>
                  Fix it:
                  <span className={classes.itemsCount} style={{ fontSize: '3.5rem'}}>
                    {props.fixItemCount.toLocaleString()}
                  </span>
                </div>
            }
          </span>
            <div className={classes.scrollbar}>
              {
                props.isLoading
                  ?
                  <Loader/>
                  :
                  <PerfectScrollbar
                    options={{
                      suppressScrollX: true,
                      minScrollbarLength: 20,
                      maxScrollbarLength: 25
                    }}
                  >
                    {renderItemList('todo')}
                  </PerfectScrollbar>
              }
            </div>
          </div>
        }
        {
          fixitTab === 1 &&
          <div className={classes.context}>
          <span
            className={classes.headerWrapper}
            style={{minHeight: props.isLoading ? 80 : 'initial'}}
          >
            {
              props.isLoading
                ?
                <Loader/>
                :
                <div className={classes.header} style={{ fontSize: '1rem' }}>
                  Fix it:
                  <span className={classes.itemsCount} style={{ fontSize: '3.5rem' }}>
                    {props.fixItemCount.toLocaleString()}
                  </span>
                </div>
            }
          </span>
            <div className={classes.scrollbar}>
              {
                props.isLoading
                  ?
                  <Loader/>
                  :
                  <PerfectScrollbar
                    options={{
                      suppressScrollX: true,
                      minScrollbarLength: 20,
                      maxScrollbarLength: 25
                    }}
                  >
                    {renderItemList('complete')}
                  </PerfectScrollbar>
              }
            </div>
          </div>
        }
        {
          !isExpanded && (props.screenWidth < 1335 || props.screenHeight < 420)
          ?
            <div style={{width: '100%'}}>
              <CustomTab
                activeTabId={fixitTab}
                setActiveTabId={setFixItTabIndex}
                tabs={['To Do', 'Complete']}
              />
            </div>
          :
            <TabsContainer
              activeTabId={fixitTab}
              setActiveTabId={setFixItTabIndex}
              tabs={['To Do', 'Complete']}
            />
        }

      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Fix-it
        </DialogTitle>
        <DialogContent>          
          <div>
            <form className={classes.root} noValidate autoComplete="off">            
              <div>              
                <div className={"MuiFormControl-root MuiTextField-root"}>
                  <label className={"MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled"} >Lawyer</label>
                  <div className={"MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl"}>
                    <select value={lawyer}  onChange={handleChange} name="user_id" id="user_id" className={"MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"}>   
                      <option value={defaultValue} disable={"true"}>--select--</option>           
                      {lawyers.map((option) => (
                        <option key={option.id} value={option.id}>{option.first_name} {option.first_name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <TextField
                  required 
                  id="asset"
                  label="Asset Number"
                  name="asset"
                  value={asset}
                  onChange={handleAssetChange}
                />
              </div>
              <div>
                <TextareaAutosize id="comment" label="Description" name="comment" value={comment} rowsMin={9} onChange={handleCommentChange}/>
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <FullWidthSwitcher show={showSwitcher} widget={"fixItems"}/>
    </div>
  )
}

const mapStateToProps = state => {
  const recordItems = state.patenTrack.recordItems[0];
  return {
    fixItemCount: recordItems && recordItems.count ? recordItems.count[0].count_items : 0,
    fixItemList: (recordItems && recordItems.list) ? recordItems.list : { todo: [], complete: [] },
    currentWidget: state.patenTrack.currentWidget,
    isLoading: state.patenTrack.recordItemsLoading,
    screenWidth: state.patenTrack.screenWidth,
    screenHeight: state.patenTrack.screenHeight,
    fixitTab: state.patenTrack.fixitTab,
    lawyers: state.patenTrack.lawyerList ? state.patenTrack.lawyerList : [],
    shareUrl: state.patenTrack.shareUrl ? state.patenTrack.shareUrl : ''
  };
};

const mapDispatchToProps = {
  getRecordItems,
  getLawyers,
  setFixItTabIndex,
  postRecordItems
};

export default connect(mapStateToProps, mapDispatchToProps)(FixItemsContainer);