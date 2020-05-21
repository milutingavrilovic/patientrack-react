import React, { useState } from "react";
import { connect } from "react-redux";
import useStyles, { useMatStyles } from "./styles";
import FullWidthSwitcher from "../FullWidthSwitcher";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import Loader from "../Loader";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import TabsContainer from "../Tabs";
import CustomTab from "../CustomTab";
import Typography from "@material-ui/core/Typography";
import {
  getRecordItems,
  setRecordItTabIndex,
  completeRecord,
} from "../../../actions/patenTrackActions";

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
  return order === "desc"
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
  return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const classesMat = useMatStyles();
  const headCells = [
    { id: "Id", numeric: true, disablePadding: false, label: "Complete" },
    { id: "Asset", numeric: false, disablePadding: false, label: "Asset" },
    {
      id: "CompanyName",
      numeric: false,
      disablePadding: false,
      label: "Company Name",
    },
    { id: "Comment", numeric: false, disablePadding: false, label: "Comment" },
    {
      id: "Telephone",
      numeric: false,
      disablePadding: false,
      label: "Telephone",
    },
    {
      id: "CreatedAt",
      numeric: false,
      disablePadding: false,
      label: "Created At",
    },
    {
      id: "EmailAddress",
      numeric: false,
      disablePadding: false,
      label: "EmailAddress",
    },
  ];
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={classesMat.tablehHeaderRow}>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classnames(classesMat.tableHeader)}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function RecordItemsContainer(props) {
  const { recorditTab, setRecordItTabIndex } = props;
  const classes = useStyles();
  const isExpanded = props.currentWidget === "recordItems";
  const [showSwitcher, setShowSwitcher] = useState(0);
  const [sortDate, setSortDate] = useState("asc");
  const [sortAsset, setSortAsset] = useState("asc");
  const [sortName, setSortName] = useState("asc");
  const [fixList, setFixList] = useState([]);
  const [recordList, setRecordList] = useState([]);
  const [toDoFixItemList, setToDoFixItemList] = useState([]);
  const [toDoRecordItemList, setToDoRecordItemList] = useState([]);
  const [toDoCompleteItemList, setToDoCompleteItemList] = useState([]);
  // MATERIAL UI DATATABLE START
  const classesMat = useMatStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Asset");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortMe = e => {
    const col = e.target.getAttribute("data-col");
    const direction = e.target.getAttribute("data-sort");
    const type = e.target.getAttribute("data-type");
    const bind = e.target.getAttribute("data-bind");
    console.log(col, direction, type, bind);
    let newItems;
    if (bind === "0") {
      console.log(fixList);
      newItems = [...fixList[type]];
    } else {
      console.log(recordList);
      newItems = [...recordList[type]];
    }
    console.log("before", newItems);
    switch (col) {
      case "created_at":
        newItems.sort((a, b) => {
          var key = new Date(a.created_at);
          var key1 = new Date(b.created_at);
          if (key < key1) {
            return direction === "asc" ? -1 : 1;
          }
          if (key > key1) {
            return direction === "asc" ? 1 : -1;
          }
          return 0;
        });
        break;
      case "asset":
        newItems.sort((a, b) => {
          if (a[col] < b[col]) {
            return direction === "asc" ? -1 : 1;
          }
          if (a[col] > b[col]) {
            return direction === "asc" ? 1 : -1;
          }
          return 0;
        });
        break;
      case "name":
        newItems.sort((a, b) => {
          var key = a.company_lawyer.first_name;
          var key1 = b.company_lawyer.first_name;
          if (key < key1) {
            return direction === "asc" ? -1 : 1;
          }
          if (key > key1) {
            return direction === "asc" ? 1 : -1;
          }
          return 0;
        });
        break;
    }
    col === "created_at"
      ? setSortDate(direction === "asc" ? "desc" : "asc")
      : col === "asset"
      ? setSortAsset(direction === "asc" ? "desc" : "asc")
      : setSortName(direction === "asc" ? "desc" : "asc");
    console.log("after", newItems);
    if (bind === "0") {
      setFixList(
        Object.assign(
          {},
          {
            ...fixList,
            [type]: newItems,
          },
        ),
      );
    } else {
      setRecordList(
        Object.assign(
          {},
          {
            ...recordList,
            [type]: newItems,
          },
        ),
      );
    }
  };

  function CustomHeader(props) {
    return (
      <TableContainer>
        <Table
          aria-labelledby="Table Heading"
          size={"small"}
          aria-label="Table Heading"
          className={classes.sortTable}
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                onClick={sortMe}
                data-bind={props.bind}
                data-type={props.type}
                data-col={"created_at"}
                data-sort={sortDate}
              >
                Date
              </TableCell>
              <TableCell
                align="center"
                onClick={sortMe}
                data-bind={props.bind}
                data-type={props.type}
                data-col={"asset"}
                data-sort={sortAsset}
              >
                Asset
              </TableCell>
              <TableCell
                align="right"
                onClick={sortMe}
                data-bind={props.bind}
                data-type={props.type}
                data-col={"name"}
                data-sort={sortName}
              >
                Lawyer
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    );
  }

  React.useEffect(() => {
    if (
      props.fixItemList &&
      (props.fixItemList["todo"].length > 0 ||
        props.fixItemList["complete"].length > 0)
    ) {
      setFixList(props.fixItemList);
      const toDoItems = props.fixItemList["todo"].map(item => ({
        Id: item.id,
        Asset: item.asset,
        Name:
          item.company_lawyer.first_name + " " + item.company_lawyer.last_name,
        Comment: item.comment,
        CompanyName: item.company_lawyer.firm_name,
        Telephone: item.company_lawyer.telephone,
        CreatedAt: new Intl.DateTimeFormat("en-US").format(
          new Date(item.created_at),
        ),
        EmailAddress: item.company_lawyer.email_address,
      }));
      setToDoFixItemList(toDoItems);
    }

    if (
      props.recordItemList &&
      (props.recordItemList["todo"].length > 0 ||
        props.recordItemList["complete"].length > 0)
    ) {
      setRecordList(props.recordItemList);
      if (props.recordItemList["todo"].length > 0) {
        const toDoRecordItems = props.recordItemList["todo"].map(item => ({
          Id: item.id,
          Asset: item.asset,
          Name:
            item.company_lawyer.first_name +
            " " +
            item.company_lawyer.last_name,
          Comment: item.comment,
          CompanyName: item.company_lawyer.firm_name,
          Telephone: item.company_lawyer.telephone,
          CreatedAt: new Intl.DateTimeFormat("en-US").format(
            new Date(item.created_at),
          ),
          EmailAddress: item.company_lawyer.email_address,
        }));
        setToDoRecordItemList(toDoRecordItems);
      }
      if (props.recordItemList["complete"].length > 0) {
        const toDoCompleteItems = props.recordItemList["complete"].map(
          item => ({
            Id: item.id,
            Asset: item.asset,
            Name:
              item.company_lawyer.first_name +
              " " +
              item.company_lawyer.last_name,
            Comment: item.comment,
            CompanyName: item.company_lawyer.firm_name,
            Telephone: item.company_lawyer.telephone,
            CreatedAt: new Intl.DateTimeFormat("en-US").format(
              new Date(item.created_at),
            ),
            EmailAddress: item.company_lawyer.email_address,
          }),
        );
        setToDoCompleteItemList(toDoCompleteItems);
      }
    }
  }, [props.fixItemList, props.recordItemList]);

  const completeItem = e => {
    console.log(`Selected main company`);
    console.log(e.target.value, e.target.checked);
    const type = e.target.getAttribute("data-type");
    if (e.target.checked) {
      let formData = new FormData();
      formData.append("complete", e.target.value);
      props.completeRecord(formData, type);
      if (type == "0") {
        const items = { ...toDoFixItemList };
        const index = items.findIndex(row => row.Id === e.target.value);
        if (index > -1) {
          items.splice(index, 1);
          setToDoFixItemList(items);
        }
      } else if (type == "1") {
        const items = { ...toDoRecordItemList };
        const index = items.findIndex(row => row.Id === e.target.value);
        if (index > -1) {
          items.splice(index, 1);
          setToDoRecordItemList(items);
        }
      }
    }
  };

  const renderItemList = (t, type) => {
    const items = t == 0 ? fixList[type] : recordList[type];
    const itemsExpand =
      t == 0
        ? toDoFixItemList
        : t == 2
        ? toDoCompleteItemList
        : toDoRecordItemList;
    if (!isExpanded) {
      return (
        <div className={`todo-list ${classes.column}`}>
          {items ? (
            <Table
              aria-labelledby="tableTitle"
              size={"small"}
              aria-label="short table"
            >
              <TableBody>
                {items.map(item => {
                  const createdAt =
                    type === "todo"
                      ? new Date(item.created_at)
                      : new Date(item.updated_at);
                  return (
                    <TableRow hover tabIndex={-1} key={item.id}>
                      <TableCell align="left">
                        <span
                          className={`green ${classnames(
                            classes.displayBlock,
                            classes.ellipsis,
                          )}`}
                        >
                          {new Intl.DateTimeFormat("en-US").format(createdAt)}
                        </span>
                        <span
                          className={`grey ${classnames(
                            classes.displayBlock,
                            classes.ellipsis,
                          )}`}
                        >
                          {item.asset}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span
                          className={`grey ${classnames(
                            classes.displayBlock,
                            classes.ellipsis,
                          )}`}
                        >{`${item.company_lawyer.first_name}  ${item.company_lawyer.last_name}`}</span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            ""
          )}
        </div>
      );
    }
    return (
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size={"small"}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classesMat}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={itemsExpand.length}
            type={type}
          />
          <TableBody>
            {stableSort(itemsExpand, getComparator(order, orderBy)).map(
              (row, index) => {
                const labelId = `enhanced-table-${index}`;
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    className={classesMat.tableHeader}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="center"
                      className={classesMat.tableHeader}
                    >
                      <Checkbox
                        color="default"
                        value={row.Id}
                        onChange={completeItem}
                        data-type={type}
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classesMat.tableHeader}
                    >
                      {row.Asset}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classesMat.tableHeader}
                    >
                      {row.Name}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classesMat.tableHeader}
                    >
                      {row.CompanyName}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classesMat.tableHeader}
                    >
                      {row.Comment}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classesMat.tableHeader}
                    >
                      {row.Telephone}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classesMat.tableHeader}
                    >
                      {row.CreatedAt}
                    </TableCell>
                  </TableRow>
                );
              },
            )}
            {itemsExpand.length > 0 && (
              <TableRow style={{ height: 33 * 1 }}>
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
      className={classes.recordItemsContainer}
      onMouseOver={() => {
        setShowSwitcher(true);
      }}
      onMouseLeave={() => {
        setShowSwitcher(false);
      }}
    >
      <div className={classes.container}>
        {recorditTab === 0 && (
          <div className={classes.context}>
            <div className={classes.tableContainer}>
              <div className={`info-box ${classes.wrapper}`}>
                {props.isLoading ? (
                  <Loader />
                ) : (
                  <TableContainer component={Paper}>
                    <Table
                      className={`head_box_table `}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody>
                        <TableRow key={1}>
                          <TableCell align="center" colSpan={2}>
                            <Typography
                              variant="h4"
                              component="h4"
                              className={"green"}
                            >
                              {`Process: 345`}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow key={2}>
                          <TableCell>
                            <Typography
                              variant="h6"
                              component="h6"
                              align="left"
                            >
                              {"Fix: "}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="h6"
                              component="h6"
                              className={"green"}
                              align="right"
                            >
                              {props.fixItemCount.toLocaleString()}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow key={3}>
                          <TableCell>
                            <Typography
                              variant="h6"
                              component="h6"
                              align="left"
                            >
                              {"Records: "}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="h6"
                              component="h6"
                              className={"green"}
                              align="right"
                            >
                              {props.recordItemCount.toLocaleString()}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow key={4}>
                          <TableCell>
                            <Typography
                              variant="h6"
                              component="h6"
                              align="left"
                            >
                              {"Complete: "}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="h6"
                              component="h6"
                              className={"green"}
                              align="right"
                            >
                              {props.recordItemList["complete"].length}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            </div>
            <div style={{ minHeight: "30px" }}>
              <CustomHeader type={"todo"} bind={0} />
            </div>
            <div className={classes.scrollbar}>
              {props.isLoading ? (
                <Loader />
              ) : (
                <PerfectScrollbar
                  options={{
                    suppressScrollX: true,
                    minScrollbarLength: 20,
                    maxScrollbarLength: 25,
                  }}
                >
                  {renderItemList(0, "todo")}
                </PerfectScrollbar>
              )}
            </div>
          </div>
        )}
        {recorditTab === 1 && (
          <div className={classes.context}>
            <div className={classes.tableContainer}>
              <div className={classes.wrapper}>
                {props.isLoading ? (
                  <Loader />
                ) : (
                  <TableContainer component={Paper}>
                    <Table
                      className={`head_box_table `}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody>
                        <TableRow key={1}>
                          <TableCell align="center" colSpan={2}>
                            <Typography
                              variant="h4"
                              component="h4"
                              className={"green"}
                            >
                              {`Process: 471`}
                            </Typography>
                          </TableCell>
                        </TableRow>

                        <TableRow key={2}>
                          <TableCell>
                            <Typography
                              variant="h6"
                              component="h6"
                              align="left"
                              className={"green"}
                            >
                              {`Fix: `}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="right"
                            className={"head_box_number green"}
                          >
                            {props.fixItemCount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                        <TableRow key={3}>
                          <Typography
                            variant="h6"
                            component="h6"
                            align="left"
                            className={"green"}
                          >
                            {"Records: "}
                          </Typography>

                          <TableCell
                            align="right"
                            className={"head_box_number green"}
                          >
                            {props.recordItemCount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                        <TableRow key={4}>
                          <Typography
                            variant="h6"
                            component="h6"
                            align="left"
                            className={"green"}
                          >
                            {"Complete: "}
                          </Typography>

                          <TableCell
                            align="right"
                            className={"head_box_number green"}
                          >
                            {props.recordItemList["complete"].length}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            </div>
            <div style={{ minHeight: "30px" }}>
              <CustomHeader type={"todo"} bind={1} />
            </div>
            <div className={classes.scrollbar}>
              {props.isLoading ? (
                <Loader />
              ) : (
                <PerfectScrollbar
                  options={{
                    suppressScrollX: true,
                    minScrollbarLength: 20,
                    maxScrollbarLength: 25,
                  }}
                >
                  {renderItemList(1, "todo")}
                </PerfectScrollbar>
              )}
            </div>
          </div>
        )}
        {recorditTab === 2 && (
          <div className={classes.context}>
            <div className={classes.tableContainer}>
              <div className={classes.wrapper}>
                {props.isLoading ? (
                  <Loader />
                ) : (
                  <TableContainer component={Paper}>
                    <Table
                      className={`head_box_table `}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody>
                        <TableRow key={1}>
                          <TableCell
                            align="center"
                            colSpan={2}
                            className={"head_box_heading green"}
                          >{`In Process`}</TableCell>
                        </TableRow>
                        <TableRow key={2}>
                          <TableCell align="left" className={"head_box_text"}>
                            {"Fix: "}
                          </TableCell>
                          <TableCell
                            align="right"
                            className={"head_box_number green"}
                          >
                            {props.fixItemCount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                        <TableRow key={3}>
                          <TableCell align="left" className={"head_box_text"}>
                            {"Records: "}
                          </TableCell>
                          <TableCell
                            align="right"
                            className={"head_box_number green"}
                          >
                            {props.recordItemCount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                        <TableRow key={4}>
                          <TableCell align="left" className={"head_box_text"}>
                            {"Complete: "}
                          </TableCell>
                          <TableCell
                            align="right"
                            className={"head_box_number green"}
                          >
                            {props.recordItemList["complete"].length}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            </div>
            <div style={{ minHeight: "30px" }}>
              <CustomHeader type={"todo"} bind={2} />
            </div>
            <div className={classes.scrollbar}>
              {props.isLoading ? (
                <Loader />
              ) : (
                <PerfectScrollbar
                  options={{
                    suppressScrollX: true,
                    minScrollbarLength: 20,
                    maxScrollbarLength: 25,
                  }}
                >
                  {renderItemList(2, "complete")}
                </PerfectScrollbar>
              )}
            </div>
          </div>
        )}
        {!isExpanded &&
        (props.screenWidth < 1335 || props.screenHeight < 420) ? (
          <div style={{ width: "100%" }}>
            <CustomTab
              activeTabId={recorditTab}
              setActiveTabId={setRecordItTabIndex}
              tabs={["Fix", "Record", "Complete"]}
            />
          </div>
        ) : (
          <TabsContainer
            activeTabId={recorditTab}
            setActiveTabId={setRecordItTabIndex}
            tabs={["Fix", "Record", "Complete"]}
          />
        )}
      </div>
      <FullWidthSwitcher show={showSwitcher} widget={"recordItems"} />
    </div>
  );
}

const mapStateToProps = state => {
  const recordItems = state.patenTrack.recordItems[1];
  const fixItems = state.patenTrack.recordItems[0];
  return {
    recordItemCount:
      recordItems && recordItems.count ? recordItems.count[0].count_items : 0,
    recordItemList:
      recordItems && recordItems.list
        ? recordItems.list
        : { todo: [], complete: [] },
    fixItemCount:
      fixItems && fixItems.count ? fixItems.count[0].count_items : 0,
    fixItemList:
      fixItems && fixItems.list ? fixItems.list : { todo: [], complete: [] },
    currentWidget: state.patenTrack.currentWidget,
    isLoading: state.patenTrack.recordItemsLoading,
    screenWidth: state.patenTrack.screenWidth,
    screenHeight: state.patenTrack.screenHeight,
    recorditTab: state.patenTrack.recorditTab,
  };
};

const mapDispatchToProps = {
  getRecordItems,
  setRecordItTabIndex,
  completeRecord,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordItemsContainer);
