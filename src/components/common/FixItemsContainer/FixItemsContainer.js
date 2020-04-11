import React, { useState } from "react";
import {connect} from 'react-redux';
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher/FullWidthSwitcher";
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';

function FixItemsContainer(props) {
  const classes = useStyles();
  const isExpanded = props.currentWidget === 'fixItems';
  const [showSwitcher, setShowSwitcher] = useState(0);

  const expandStyle = {
    minWidth: isExpanded ? 150 : 'intial',
    borderRight: isExpanded ? '1px solid #363636' : 'initial'
  };

  return (
    <div
      className     = {classes.fixItemsContainer}
      onMouseOver   = {() => {setShowSwitcher(true)}}
      onMouseLeave  = {() => {setShowSwitcher(false)}}
    >
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.wrapper}>
            <div className={classes.context}>
              <Typography
                varient="h1"
                className={classes.header}
              >
                Fix it:
                <span className={classes.itemsCount}>
                {props.fixItemCount}
              </span>
              </Typography>
              <div className={classes.scrollbar}>
                <PerfectScrollbar
                  options={{
                    suppressScrollX: true,
                    minScrollbarLength: 20,
                    maxScrollbarLength: 25
                  }}
                >
                  <div className={ isExpanded ? classes.row : classes.column}>
                    {
                      isExpanded
                        ?
                        <div className={classes.rowItem}>
                          <span className={classes.gridItemHeader}>Company Name</span>
                          <span className={classes.gridItemHeader}>Telephone</span>
                          <span className={classes.gridItemHeader}>Created At</span>
                        </div>
                        :
                        ''
                    }
                    {
                      props.fixItemList
                      ?
                        props.fixItemList.map(item => {
                          const createdAt = new Date(item.created_at);

                          return (
                            <div
                              key={item.id}
                              className={ isExpanded ? classes.rowItem : classes.columnItem}
                            >
                              <div
                                className={classnames(classes.telephone, classes.gridItem)}
                                style={{...(isExpanded ? expandStyle : {})}}
                              >
                                {item.company_lawyer.telephone}
                              </div>
                              <div
                                className={classnames(classes.created_dt, classes.gridItem)}
                                style={{
                                  ...(isExpanded ? expandStyle : {})
                                }}
                              >
                                {new Intl.DateTimeFormat('en-US').format(createdAt)}
                              </div>
                              <div
                                className={classnames(classes.name, classes.gridItem)}
                                style={{
                                  order: isExpanded ? 'initial' : 3,
                                  ...(isExpanded ? expandStyle : {})
                                }}
                              >
                                {item.company_lawyer.first_name + ' ' + item.company_lawyer.last_name}
                              </div>
                            </div>
                          )
                        })
                      :
                        ''
                    }
                  </div>
                </PerfectScrollbar>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FullWidthSwitcher show={showSwitcher} widget={"fixItems"}/>
    </div>
  )
}

const mapStateToProps = state => {
  const recordItems = state.patenTrack.recordItems[0];

  return {
    fixItemCount: recordItems && recordItems.count ? recordItems.count[0].count_items : 0,
    fixItemList: recordItems ? recordItems.list : [],
    currentWidget: state.patenTrack.currentWidget
  };
};

export default connect(mapStateToProps)(FixItemsContainer);