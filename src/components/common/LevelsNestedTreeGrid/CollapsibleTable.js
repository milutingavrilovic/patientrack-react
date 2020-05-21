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
import CollapseLevel2 from "./CollapseLevel2";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableCell1: {
    width: "45%",
    paddingRight: 0,
  },
  tableCell2: {
    width: "40%",
    paddingLeft: 0,
    paddingRight: 0,
  },
  tableCell3: {
    width: "10%",
    paddingLeft: 0,
    paddingRight: 0,
  },
});

function Row(props) {
  const row = props.row;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell node1={row.id} name={row.name} level={row.level} tabid={0}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.level}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
          colSpan={4}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table aria-label="collapsible table">
              <TableRow>
                <TableCell />
                <TableCell style={{ width: "40%" }}>ID</TableCell>
                <TableCell style={{ width: "40%" }}>Name</TableCell>
                <TableCell style={{ width: "7%" }}>Level</TableCell>
              </TableRow>
              <TableBody>
                {row.child.map(historyRow => (
                  <CollapseLevel2
                    row2={historyRow}
                    parentNodeParent={row}
                    {...props}
                  />
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
        <TableCell className={classes.tableCell2}>{row.name}</TableCell>
        <TableCell className={classes.tableCell3}>{row.level}</TableCell>
      </TableRow>
      {open && (
        <TableRow>
          <TableCell colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow>
                    <TableCell />
                    <TableCell className={classes.tableCell1}>ID</TableCell>
                    <TableCell className={classes.tableCell2}>Name</TableCell>
                    <TableCell className={classes.tableCell3}>Level</TableCell>
                  </TableRow>
                  {row.child.map(historyRow => (
                    <CollapseLevel2 row={historyRow} />
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const classes = useRowStyles();
  const row = props.data;
  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className={classes.tableCell1}>ID</TableCell>
            <TableCell className={classes.tableCell2}>Name</TableCell>
            <TableCell className={classes.tableCell3}>Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map(row => (
<<<<<<< HEAD
            <Row key={row.name} row={row} {...props} />
=======
            <Row key={row.name} row={row} />
>>>>>>> master-2
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
