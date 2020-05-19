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
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
      // backgroundColor: "red",
    },
  },

  rootYellow: {
    "& > *": {
      borderBottom: "unset",
      // backgroundColor: "yellow",
    },
  },
  rootChilGreen: {
    "& > *": {
      borderBottom: "unset",
      // backgroundColor: "green",
    },
  },
  rootOrangre: {
    "& > *": {
      borderBottom: "unset",
      // backgroundColor: "orange",
    },
  },
});


function Row(props) {
  const row = props.row;
  const [open, setOpen] = React.useState(false);
  const [openChild, setChildOpen] = React.useState(false);
  const [openChildChild, setChildChildOpen] = React.useState(false);
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
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.level}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table aria-label="collapsible" className={classes.rootYellow}>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell>ID </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Level</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.child.map(historyRow => (
                    <>
                      <TableRow key={historyRow.id}>
                        <TableCell />
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setChildOpen(!openChild)}
                          >
                            {openChild ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {historyRow.id}
                        </TableCell>
                        <TableCell>{historyRow.name}</TableCell>
                        <TableCell>{historyRow.level}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                            paddingLeft: 0,
                            paddingRight: 0,
                          }}
                          colSpan={6}
                        >
                          <Collapse in={openChild} timeout="auto" unmountOnExit>
                            <Box>
                              <Table
                                size=""
                                aria-label="collapsible table"
                                className={classes.rootChilGreen}
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell />
                                    {/* <TableCell /> */}
                                    <TableCell />
                                    <TableCell />
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Level</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {historyRow &&
                                    historyRow.child &&
                                    historyRow.child.map(sendChild => (
                                      <>
                                        <TableRow key={sendChild.id}>
                                          <TableCell />
                                          <TableCell
                                            component="th"
                                            scope="row"
                                          />
                                          <TableCell>
                                            <IconButton
                                              aria-label="expand row"
                                              size="small"
                                              onClick={() =>
                                                setChildChildOpen(
                                                  !openChildChild,
                                                )
                                              }
                                            >
                                              {openChildChild ? (
                                                <KeyboardArrowUpIcon />
                                              ) : (
                                                <KeyboardArrowDownIcon />
                                              )}
                                            </IconButton>
                                          </TableCell>

                                          {/* <TableCell />
                                        <TableCell /> */}
                                          <TableCell>{sendChild.id}</TableCell>
                                          <TableCell>
                                            {sendChild.name}
                                          </TableCell>
                                          <TableCell>
                                            {sendChild.level}
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell
                                            style={{
                                              paddingBottom: 0,
                                              paddingTop: 0,
                                              paddingLeft: 0,
                                              paddingRight: 0,
                                            }}
                                            colSpan={10}
                                          >
                                            <Collapse
                                              in={openChildChild}
                                              timeout="auto"
                                              unmountOnExit
                                            >
                                              <Box>
                                                {/* <Typography
                                                variant="h6"
                                                gutterBottom
                                                component="div"
                                              >
                                                History
                                              </Typography> */}
                                                <Table
                                                  aria-label="collapsible table"
                                                  className={
                                                    classes.rootOrangre
                                                  }
                                                >
                                                  <TableHead>
                                                    <TableRow>
                                                      <TableCell />
                                                      <TableCell />
                                                      <TableCell />
                                                      <TableCell />
                                                      <TableCell />
                                                      <TableCell />
                                                      <TableCell>ID</TableCell>
                                                      <TableCell>
                                                        Name
                                                      </TableCell>
                                                      <TableCell>
                                                        Level
                                                      </TableCell>
                                                    </TableRow>
                                                  </TableHead>
                                                  <TableBody>
                                                    {sendChild &&
                                                      sendChild.child &&
                                                      sendChild.child.map(
                                                        thirdLevel => (
                                                          <>
                                                            <TableRow
                                                              key={
                                                                thirdLevel.id
                                                              }
                                                            >
                                                              <TableCell
                                                                component="th"
                                                                scope="row"
                                                              />

                                                              <TableCell />
                                                              <TableCell />
                                                              <TableCell />
                                                              <TableCell />
                                                              <TableCell />
                                                              <TableCell>
                                                                {thirdLevel.id}
                                                              </TableCell>
                                                              <TableCell>
                                                                {
                                                                  thirdLevel.name
                                                                }
                                                              </TableCell>
                                                              <TableCell>
                                                                {
                                                                  thirdLevel.level
                                                                }
                                                              </TableCell>
                                                            </TableRow>
                                                          </>
                                                        ),
                                                      )}
                                                  </TableBody>
                                                </Table>
                                              </Box>
                                            </Collapse>
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ))}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
//   createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
//   createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
//   createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5)
// ];

export default function CollapsibleTable(props) {
  const row = props.data;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map(row => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
