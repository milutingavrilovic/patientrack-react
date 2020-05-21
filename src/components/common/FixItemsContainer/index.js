import React, { useState } from "react";
import {connect} from 'react-redux';
import useStyles, { useMatStyles } from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher";
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';
import Loader from "../Loader";
import TabsContainer from "../Tabs";
import CustomTab from "../CustomTab";
import {getRecordItems, setFixItTabIndex} from "../../../actions/patenTrackActions";
// MATERIAL UI IMPORTS START
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// MATERIAL UI IMPORTS END
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const classesMat = useMatStyles();
  const headCells = [
    { id: 'Id', numeric: true, disablePadding: false, label: '#' },
    { id: 'Asset', numeric: false, disablePadding: false, label: 'Asset' },
    { id: 'Comment', numeric: false, disablePadding: false, label: 'Comment' },
    { id: 'CompanyName', numeric: false, disablePadding: false, label: 'Company Name' },
    { id: 'Telephone', numeric: false, disablePadding: false, label: 'Telephone' },
    { id: 'CreatedAt', numeric: false, disablePadding: false, label: 'Created At' },
    { id: 'EmailAddress', numeric: false, disablePadding: false, label: 'EmailAddress' },
  ];
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={classesMat.tablehHeaderRow}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classnames(classesMat.tableHeader) }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function ErrorTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const classesMat = useMatStyles();
  const headCells = [
    { id: 'key', numeric: false, disablePadding: false, label: '' },
    { id: 'value', numeric: false, disablePadding: false, label: '' },
  ];
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={(headCell.id === 'key') ?'left' : 'right'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classnames(classesMat.smallTableCell) }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


// MATERIAL UI ENDS
function FixItemsContainer(props) {
  const { fixitTab, setFixItTabIndex } = props;
  const classes = useStyles();
  const isExpanded = props.currentWidget === 'fixItems';
  const [showSwitcher, setShowSwitcher] = useState(0);
  const [toDoFixItemList, setToDoFixItemList] = useState([]);
  const [sortDate, setSortDate] = useState('asc');
  const [sortAsset, setSortAsset] = useState('asc');
  const [sortName, setSortName] = useState('asc');
  const [itemList, setItemList] = useState([]);
  const [errorsList, setErrorsList] = useState([]);
  // MATERIAL UI DATATABLE START
  const classesMat = useMatStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Asset');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const errorsType = ['Uspto', 'Patents', 'Total'];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const  sortMe = (e) =>{
    const col = e.target.getAttribute('data-col');
    const direction = e.target.getAttribute('data-sort');
    const type = e.target.getAttribute('data-type');
    const newItems = [...props.fixItemList[type]];
    switch(col) {
      case 'created_at': 
        newItems.sort((a, b) => {
          var key = new Date(a.created_at);
          var key1 = new Date(b.created_at);
          if (key < key1) {
            return direction === 'asc' ? -1 : 1;
          }
          if (key > key1) {
            return direction === 'asc' ? 1 : -1;
          }
          return 0;
        }); 
        break;
      case 'asset':
        newItems.sort((a, b) => {
          if (a[col] < b[col]) {
            return direction === 'asc' ? -1 : 1;
          }
          if (a[col] > b[col]) {
            return direction === 'asc' ? 1 : -1;
          }
          return 0;
        });
        break;
      case 'name':
        newItems.sort((a, b) => {
          var key = a.company_lawyer.first_name;
          var key1 = b.company_lawyer.first_name;
          if (key < key1) {
            return direction === 'asc' ? -1 : 1;
          }
          if (key > key1) {
            return direction === 'asc' ? 1 : -1;
          }
          return 0;
        }); 
        break;
    }
    col === 'created_at' ? setSortDate(direction=== 'asc' ? 'desc' : 'asc') : col === 'asset' ? setSortAsset(direction=== 'asc' ? 'desc' : 'asc') : setSortName(direction=== 'asc' ? 'desc' : 'asc') ;
    setItemList(Object.assign({}, {
      ...props.fixItemList,
      [type]: newItems
    }))
  }
  
  function CustomHeader(props){
    return (
      <TableContainer>
        <Table aria-labelledby="Table Heading"
          size={'small'}
          aria-label="Table Heading"
          className={classes.sortTable}
        >
          <TableHead>
            <TableRow>
              <TableCell align="left" onClick={sortMe} data-type={props.type} data-col={'created_at'} data-sort={sortDate}>Date</TableCell>
              <TableCell align="center" onClick={sortMe} data-type={props.type} data-col={'asset'} data-sort={sortAsset}>Asset</TableCell>
              <TableCell align="right" onClick={sortMe} data-type={props.type} data-col={'name'} data-sort={sortName}>Lawyer</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    );
  }

  React.useEffect(() => {
    if(props.fixItemList && (props.fixItemList['todo'].length > 0 || props.fixItemList['complete'].length > 0)){
      setItemList(props.fixItemList);
    }
    if(props.fixItemList && props.fixItemList['todo'] && props.fixItemList['todo'].length > 0) {
      const toDoItems = props.fixItemList['todo'].map(item => ({
        Id: item.id,
        Asset: item.asset,
        LawyeId: item.lawyer_id,
        Comment: item.comment,
        CompanyName: item.company_lawyer.first_name + ' ' + item.company_lawyer.last_name,
        Telephone: item.company_lawyer.telephone,
        CreatedAt: new Intl.DateTimeFormat('en-US').format(new Date(item.created_at)),
        EmailAddress: item.company_lawyer.email_address
      }) );
      setToDoFixItemList(toDoItems); 
    }
    //if(props.fixItemCount > 0) {
      const makeErrorsList = errorsType.map(error => ({
        key: error,
        value: props.fixItemCount || 0
      }) );
      setErrorsList(makeErrorsList)
    //}

  },[props.fixItemList, props.fixItemCount]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, toDoFixItemList.length - page * rowsPerPage);
  // MATERIAL UI DATATABLE END
  const renderItemList = ( type ) => {
    if(!isExpanded) {
      return (
      <div className={`todo-list ${classes.column}`}>
        {
          itemList[type]
          ?            
          <Table
            aria-labelledby="tableTitle"
            size={'small'}
            aria-label="short table"
          >            
          <TableBody>
            {
              itemList[type].map(item => {
                const createdAt = (type === 'todo') ? new Date(item.created_at): new Date(item.updated_at);
                return (
                  <TableRow hover tabIndex={-1} key={item.id} >
                    <TableCell align="left">
                      <span className={`white ${classnames(classes.displayBlock, classes.ellipsis)}`}>{new Intl.DateTimeFormat('en-US').format(createdAt)}</span>
                      <span className={`grey ${classnames(classes.displayBlock, classes.ellipsis)}`}>{item.asset}</span>
                    </TableCell>
                    <TableCell align="right">
                      <span className={`grey ${classnames(classes.displayBlock, classes.ellipsis)}`}>{`${item.company_lawyer.first_name}  ${item.company_lawyer.last_name}`}</span>
                    </TableCell>
                  </TableRow>
                );
              })
            }         
          </TableBody>
        </Table>
        :
        ''
        }
      </div>);
    }
    return (
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={'small'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classesMat}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={toDoFixItemList.length}
            />
            <TableBody>
              {stableSort(toDoFixItemList, getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.Id}
                      className={classesMat.tableHeader}
                    >
                      <TableCell component="th" id={labelId} scope="row" align="center" className={classesMat.tableHeader}>
                      <Checkbox
                        color="default"
                        value={row.Id}
                      />
                      </TableCell>                      
                      <TableCell align="center" className={classesMat.tableHeader}>{row.Asset}</TableCell>
                      <TableCell align="center" className={classesMat.tableHeader}>{row.CompanyName}</TableCell>
                      <TableCell align="center" className={classesMat.tableHeader}>{row.Comment}</TableCell>                      
                      <TableCell align="center" className={classesMat.tableHeader}>{row.Telephone}</TableCell>
                      <TableCell align="center" className={classesMat.tableHeader}>{row.CreatedAt}</TableCell>
                      <TableCell align="center" className={classesMat.tableHeader}>{row.EmailAddress}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
            <div className={classes.tableContainer}>
              <div className={`info-box ${classes.wrapper}`}>
                {
                  props.isLoading
                  ?
                  <Loader/>
                  :
                  <TableContainer component={Paper}>
                    <Table className={`head_box_table `} size="small" aria-label="a dense table">
                      <TableBody>                    
                        <TableRow key={1}>
                          <TableCell align="center" colSpan={2}>                            
                            <Typography variant="h4" component="h4" className={"white"}>
                              {`Errors: 578`}
                            </Typography>  
                          </TableCell>
                        </TableRow>
                        <TableRow key={2}>
                          <TableCell>
                            <Typography variant="h6" component="h6" align="left">
                              {`Uspto: `}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" component="h6" className={"white"} align="right">
                              {props.fixItemCount.toLocaleString()}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow key={3}>
                          <TableCell>
                            <Typography variant="h6" component="h6" align="left">
                              {`Patents: `}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" component="h6" className={"white"} align="right">
                              {props.fixItemCount.toLocaleString()}
                            </Typography>
                          </TableCell>
                        </TableRow>     
                        <TableRow key={4}>
                          <TableCell>
                            <Typography variant="h6" component="h6" align="left">
                              {`Total: `}
                            </Typography>
                          </TableCell>
                          <TableCell>                            
                            <Typography variant="h6" component="h6" className={"white"} align="right">
                              {props.fixItemCount.toLocaleString()}
                            </Typography>
                          </TableCell>
                        </TableRow>                  
                      </TableBody>
                    </Table>
                  </TableContainer>
                }
              </div>          
            </div>
            <div style={{minHeight:'30px'}}>
              <CustomHeader type={'todo'}/>
            </div>
            <div className={classes.scrollbar}>
              {
                props.isLoading
                  ?
                  <Loader/>
                  :                  
                  <PerfectScrollbar
                    className={(isExpanded) ? classesMat.enhancedTableContainer: ''}
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
            <div className={classes.tableContainer}>
              <div className={classes.wrapper}>
              {
                props.isLoading
                ?
                <Loader/>
                :
                <TableContainer component={Paper}>
                  <Table className={`head_box_table `} size="small" aria-label="a dense table">
                    <TableBody>                    
                      <TableRow key={1}>
                        <TableCell align="center" colSpan={2} className={"head_box_heading white"}>{`Errors`}</TableCell>
                      </TableRow>
                      <TableRow key={2}>
                        <TableCell align="left" className={"head_box_text"}>{'Uspto: '}</TableCell>
                        <TableCell align="right" className={"head_box_number white"}>{props.fixItemCount.toLocaleString()}</TableCell>
                      </TableRow>
                      <TableRow key={3}>
                        <TableCell align="left" className={"head_box_text"}>{'Patents: '}</TableCell>
                        <TableCell align="right" className={"head_box_number white"}>{props.fixItemCount.toLocaleString()}</TableCell>
                      </TableRow>     
                      <TableRow key={4}>
                        <TableCell align="left" className={"head_box_text"}>{'Total: '}</TableCell>
                        <TableCell align="right" className={"head_box_number white"}>{props.fixItemCount.toLocaleString()}</TableCell>
                      </TableRow>                  
                    </TableBody>
                  </Table>
                </TableContainer>
              }
              </div>          
            </div>
            <div style={{minHeight:'30px'}}>
              <CustomHeader type={'complete'}/>
            </div>
            <div className={classes.scrollbar}>
              {
                props.isLoading
                  ?
                  <Loader/>
                  :
                  <PerfectScrollbar
                    className={(isExpanded) ? classesMat.enhancedTableContainer: ''}
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
          fixitTab === 2 &&
          <div className={classes.context}>
            <div className={classes.tableContainer}>
              <div className={classes.wrapper}>

              </div>
            </div>
          </div>
        }
        {
          fixitTab === 3 &&
          <div className={classes.context}>
            <div className={classes.tableContainer}>
              <div className={classes.wrapper}>

              </div>
            </div>
          </div>
        }
        {
          fixitTab === 4 &&
          <div className={classes.context}>
            <div className={classes.tableContainer}>
              <div className={classes.wrapper}>

              </div>
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
                tabs={['Invent', 'Assign.', 'Corr', 'Address', 'Security']}
              />
            </div>
          :
            <TabsContainer
              activeTabId={fixitTab}
              setActiveTabId={setFixItTabIndex}
              tabs={['Invent', 'Assign.', 'Corr', 'Address', 'Security']}
            />
        }
      </div>      
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
  };
};

const mapDispatchToProps = {
  getRecordItems,
  setFixItTabIndex
};

export default connect(mapStateToProps, mapDispatchToProps)(FixItemsContainer);