import React, { useState } from "react";
import {connect} from 'react-redux';
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from "classnames";
import Loader from "../Loader/Loader";
import TabsContainer from "../Tabs/TabsContainer";

function RecordItemsContainer(props) {
  const classes = useStyles();
  const [showSwitcher, setShowSwitcher] = useState(0);
  const isExpanded = props.currentWidget === 'recordItems';
  const [activeTabId, setActiveTabId] = useState(0);

  const renderItemList = () => {
    if(!isExpanded) {
      return (
        <div className={classes.column}>
          {
            props.recordItemList
              ?
              props.recordItemList.map(item => {
                const createdAt = new Date(item.created_at);

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
          props.recordItemList
            ?
            props.recordItemList.map(item => {
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
      className     = {classes.recordItemsContainer}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.container}>
        {
          activeTabId === 0 &&
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
                <div className={classes.header}>
                  Record it:
                  <span className={classes.itemsCount}>
                    {props.recordItemCount}
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
                    {renderItemList()}
                  </PerfectScrollbar>
              }
            </div>
          </div>
        }
        {
          activeTabId === 1 &&
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
                <div className={classes.header}>
                  Record it:
                  <span className={classes.itemsCount}>
                    {props.recordItemCount}
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
                    {renderItemList()}
                  </PerfectScrollbar>
              }
            </div>
          </div>
        }
        <TabsContainer
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
          tabs={['To Do', 'Complete']}
        />
      </div>
      <FullWidthSwitcher show={showSwitcher} widget={"recordItems"}/>
    </div>
  )
}

const mapStateToProps = state => {
  const recordItems = state.patenTrack.recordItems[1];

  return {
    recordItemCount: recordItems && recordItems.count ? recordItems.count[0].count_items : 0,
    recordItemList: recordItems ? recordItems.list : [],
    currentWidget: state.patenTrack.currentWidget,
    isLoading: state.patenTrack.isLoading
  };
};

export default connect(mapStateToProps)(RecordItemsContainer);