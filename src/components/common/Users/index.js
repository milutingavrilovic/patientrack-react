import React, { useState } from 'react';
import {connect} from 'react-redux';
import useStyles from "./styles";
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from "classnames";
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import TableCell from '@material-ui/core/TableCell';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import GridMUI from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { EditingState, SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  TableEditRow,
  TableInlineCellEditing,
  Toolbar,
  VirtualTable
} from '@devexpress/dx-react-grid-material-ui';

import {
  Plugin,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

import { getUsers, addUser, updateUser, deleteUser } from "../../../actions/patenTrackActions";

const getRowId = row => row.id;

const styles = () => ({
  input: {
    fontSize: '14px',
    width: '90px',
  },
  label: {
    fontSize: '14px',
  },
  container: {
    maxWidth: '18em',
  },
  selector: {
    height: '32px',
  },
});

const StartEditActionSelectorBase = (props) => {
  const { defaultAction, changeAction, classes } = props;
  return (
    <GridMUI
      container
      alignItems="center"
      className={classes.container}
    >
      <Typography
        className={classes.label}
      >
        Start Edit Action:
        &nbsp;
      </Typography>
      <Select
        onChange={e => changeAction(e.target.value)}
        value={defaultAction}
        className={classes.selector}
        input={(
          <OutlinedInput
            classes={{ input: classes.input }}
            labelWidth={0}
            margin="dense"
          />
        )}
      >
        <MenuItem value="click">Click</MenuItem>
        <MenuItem value="doubleClick">Double Click</MenuItem>
      </Select>
    </GridMUI>
  );
};
const StartEditActionSelector = withStyles(styles, { name: 'StartEditActionSelector' })(StartEditActionSelectorBase);

const SelectTextCheckerBase = (props) => {
  const { isSelectText, changeSelectText, classes } = props;
  return (
    <FormControlLabel
      control={(
        <Checkbox
          checked={isSelectText}
          onChange={e => changeSelectText(e.target.checked)}
          color="primary"
        />
      )}
      classes={{ label: classes.label }}
      label="Select Text On Focus"
    />
  );
};
const SelectTextChecker = withStyles(styles, { name: 'SelectTextChecker' })(SelectTextCheckerBase);

const EditPropsPanel = props => (
  <Plugin name="EditPropsPanel">
    <Template name="toolbarContent">
      <SelectTextChecker {...props} />
      <TemplatePlaceholder />
      <StartEditActionSelector {...props} />
    </Template>
  </Plugin>
);

const LookupEditCellBase = ({
  availableColumnValues, value, onValueChange, classes,
}) => {
  console.log(availableColumnValues, value, onValueChange, classes);
  return (
    <TableCell
      className={classes.lookupEditCell}
    >
      <Select
        value={value}
        onChange={event => onValueChange(event.target.value)}
        MenuProps={{
          className: classes.selectMenu,
        }}
        input={(
          <Input
            classes={{ root: classes.inputRoot }}
          />
        )}
      >
        {availableColumnValues.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </TableCell>
  );
} 
export const LookupEditCell = withStyles(useStyles, { name: 'ControlledModeDemo' })(LookupEditCellBase);

const FocusableCell = ({ onClick, ...restProps }) => (
  <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
);

function Users(props) {
  const classes = useStyles();

  const [columns] = useState([
    { name: 'first_name', title: 'First Name', width: 'auto' },
    { name: 'last_name', title: 'Last Name', width: 'auto' },
    { name: 'job_title', title: 'Title', width: 'auto' },
    { name: 'email_address', title: 'Email' , width: 'auto'},
    { name: 'telephone', title: 'Telephone', width: 'auto' },
    { name: 'telephone1', title: 'Telephone', width: 'auto' },
    { name: 'role', title: 'Type', width: 'auto' },
  ]);

  const [sorting, getSorting] = useState([]);

  const [newRecordId, setNewRecordId] = useState(0);

  const [editingCells, setEditingCells] = useState([]);

  const data = [];
  if( props.userList.length > 0 ) {
      props.userList.forEach( user => {
          const record = {
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              job_title: user.job_title,
              email_address: user.email_address,
              telephone: user.telephone,
              telephone1: user.telephone1,
              role: user.role.name
          };
          data.push( record );
      });
  }
  const [rows, setRows] = useState( data );

  const AddButton = ({ onExecute }) => (
    <div style={{ textAlign: 'center' }}>
      <Button
        color="primary"
        onClick={onExecute}
        title="Create new row"
      >
        New
      </Button>
    </div>
  );
  const DeleteButton = ({ onExecute }) => (
      <IconButton
        onClick={() => {
          // eslint-disable-next-line
          if (window.confirm('Are you sure you want to delete this row?')) {
            onExecute();
          }
        }}
        title="Delete row"
      >
        <DeleteIcon className={classes.deleteIcon}/>
      </IconButton>
  );

  const commandComponents = {
    add: AddButton,
    delete: DeleteButton
  };

  const Command = ({ id, onExecute }) => {
      const CommandButton = commandComponents[id];
      return (
        <CommandButton
          onExecute={onExecute}
        />
      );
  };
  const availableValues = {
      role: ["Admin", "Manager"]
  };
  
  const EditCell = (props) => {
    const { column } = props;
    const availableColumnValues = availableValues[column.name];
    console.log("EE", column.name, availableColumnValues, props);
    /*if (availableColumnValues) {
      return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
    }*/
    return <TableEditRow.Cell {...props} />;
  };

  const [startEditAction, setStartEditAction] = useState('click');

  const [selectTextOnEditStart, setSelectTextOnEditStart] = useState(true);

  const commitChanges = ({ added, changed, deleted }) => {
      let changedRows;
      if (added) {
        /*const startingAddedId = rows.length > 0
          ? Math.max(rows[rows.length - 1].id, rows[0].id) + 1
          : 0;*/
        const minimum = rows[rows.length - 1].id + 1, maximum = minimum + 500;
        const startingAddedId = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        console.log("startingAddedId", startingAddedId);
        setNewRecordId(startingAddedId);
        changedRows = [
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
          ...rows,
        ];
        setEditingCells([{ rowId: startingAddedId, columnName: columns[0].name }]);
      }
      if (changed) {
          console.log("CHANGED", changed);
          changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));            
          const editUserID = Object.keys(changed);
          if(changed[editUserID] != undefined && newRecordId != editUserID) {
            let formData = new FormData();
            Object.entries(changed[editUserID]).map( key => {
                formData.append( key[0], key[1] );
            })
            props.updateUser(formData, editUserID);
          } else {
            let checkRow = rows.filter(row => {
              return newRecordId === parseInt(row.id);
            });   
            console.log("changedRows", checkRow);
            if(checkRow.length > 0 && typeof checkRow[0].first_name != 'undefined' && typeof checkRow[0].last_name != 'undefined') {
              if(typeof changed[editUserID]['email_address'] != 'undefined') {
                let formData = new FormData();
                Object.entries(checkRow[0]).map( key => {
                  if(key[0] != 'id') {
                    formData.append( key[0], key[1] );
                  }                  
                })    
                Object.entries(changed[editUserID]).map( key => {
                  formData.append( key[0], key[1] );
                })
                props.addUser(formData);
                setNewRecordId(0);
              }              
            }
          }           
      }
      if (deleted) {
        changedRows = deleteRows(deleted);
      }
      console.log("setRows", changedRows);
      setRows(changedRows);
  }

  const deleteRows = (deletedIds) => {
    const rowsForDelete = rows.slice();
    console.log("deletedIds", deletedIds);
    if(newRecordId != deletedIds[0]){
      props.deleteUser( deletedIds[0] );       
      setNewRecordId(0);
    }
      

    deletedIds.forEach((rowId) => {
      const index = rowsForDelete.findIndex(row => row.id === rowId);
      if (index > -1) {
        rowsForDelete.splice(index, 1);
      }
    });
    return rowsForDelete;
  };


  const addEmptyRow = () => commitChanges({ added: [{}] });

  return (
    <div
      className     = {classes.userItemsContainer}
    >
      <div className={classes.container}>
        <div className={classes.scrollbar}
          style={{height: props.height * 39  / 100}}
        >
          {      
              <Paper style={{height: props.height * 39  / 100}}>
                <Grid
                  rows={rows}
                  columns={columns}
                  getRowId={getRowId}
                >
                  <SortingState
						defaultSorting={[]}
						sorting={sorting}
						onSortingChange={getSorting}
					/>
                  <IntegratedSorting />
                  <EditingState 
                    onCommitChanges={commitChanges} 
                    addedRows={[]}
                    onAddedRowsChange={addEmptyRow}
                    editingCells={editingCells}
                    onEditingCellsChange={setEditingCells}
                  />
                  <VirtualTable cellComponent={FocusableCell} className={classes.table} height={props.height * 39  / 100}/>
                  <TableHeaderRow showSortingControls/>
                  
                  <TableInlineCellEditing
                    startEditAction={startEditAction}
                    selectTextOnEditStart={selectTextOnEditStart}
                    cellComponent={EditCell}
                  />
                  <TableEditColumn
                    showAddCommand
                    showDeleteCommand
                    commandComponent={Command}
                  />
                </Grid>
              </Paper>
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    width: state.patenTrack.screenWidth,
    height: state.patenTrack.screenHeight,
    userList: state.patenTrack.userList
  };
};

const mapDispatchToProps = {
  getUsers,
  addUser,
  updateUser,
  deleteUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
