import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import CollapsibleTable from './CollapsibleTable'

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  
  
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell  component="th" scope="row">
          {row ? row.id : ''}
        </TableCell>
        <TableCell align="left">{row ? row.name : ''}</TableCell>
        <TableCell align="left">{row ? row.level : ''}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <CollapsibleTable row={row}/>
                </TableBody>
              </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function RowWithoutCollapse(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>
            {row ? row.id : ''}
          </TableCell>
          <TableCell >{row ? row.name : ''}</TableCell>
          <TableCell>{row ? row.level : ''}</TableCell>
        </TableRow>
        <TableRow className={classes.root}>
          <TableCell colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                   <TableRow className={classes.root} >
                      <TableCell component="th" scope="row">
                        ID level 4
                      </TableCell>
                      <TableCell>Name level 4</TableCell>
                      <TableCell align="left">Level 4</TableCell>
                     
                    </TableRow>
                  </TableBody>
                </Table>

            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

export default function CollapsibleTable(props) {
  const row = props.data
  return (
   <>
            {
                row 
                ?
                <Row key={row.name} row={row} /> 
                :
                <RowWithoutCollapse />
            }
            
</>
  );
}
