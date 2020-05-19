import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
// import CollapsibleTable3 from './CollapsibleTable3'

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "1px solid white !important",
      // backgroundColor: 'green !important'
    },
    table: {
      minWidth: 650,
    },
  },
  tableCell1: {
    width: "45%",
  },
  tableCell2: {
    width: "40%",
  },
  tableCell3: {
    width: "10%",
  },
});

function RowWithoutCollapse(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {" "}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row ? row.id : ""}
        </TableCell>
        <TableCell>{row ? row.name : ""}</TableCell>
        <TableCell>{row ? row.level : ""}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableBody></TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const { row } = props;
  const classes = useRowStyles();
  return (
    <>
      <TableRow>
        <TableCell />
        <TableCell className={classes.tableCell1}>ID</TableCell>
        <TableCell className={classes.tableCell2}>Name</TableCell>
        <TableCell className={classes.tableCell3}>Level</TableCell>
      </TableRow>
      {<RowWithoutCollapse key={row.name} row={row} />}
    </>
  );
}
