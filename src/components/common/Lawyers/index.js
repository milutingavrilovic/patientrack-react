import React, { useState  } from "react";
import {connect} from 'react-redux';
import useStyles from "./styles";
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from "classnames";
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { EditingState, SortingState, IntegratedSorting} from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableEditRow, TableEditColumn, TableInlineCellEditing, VirtualTable} from '@devexpress/dx-react-grid-material-ui';

import { getLawyers, addLawyer, updateLawyer, deleteLawyer } from "../../../actions/patenTrackActions";


const FocusableCell = ({ onClick, ...restProps }) => (
  <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
);

function Lawyers(props) {
  const classes = useStyles();

  const getRowId = row => row.id;

  const [columns] = useState([
      { name: 'first_name', title: 'First Name' },
      { name: 'last_name', title: 'Last Name' },
      { name: 'firm_name', title: 'Firm' },
      { name: 'email_address', title: 'Email' },
      { name: 'telephone', title: 'Telephone1' },
      { name: 'telephone1', title: 'Telephone2' }
  ]);

  const [editingCells, setEditingCells] = useState([]);

  /*const [sorting, getSorting] = useState([{ columnName: 'first_name', direction: 'asc' }]);*/

  const [sorting, getSorting] = useState([]);

  const [newRecordId, setNewRecordId] = useState(0);

  const [rows, setRows] = useState( props.lawyerList );

  console.log("ROWS", rows);

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

  const EditCell = (props) => {
    return <TableEditRow.Cell {...props} />;
  };

  const deleteRows = (deletedIds) => {
      const rowsForDelete = rows.slice();
      console.log("deletedIds", deletedIds);
      if(newRecordId != deletedIds[0]){
        props.deleteLawyer( deletedIds[0] );       
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

  const commitChanges = ({ added, changed, deleted }) => {
      let changedRows;
      if (added) {
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
          if(changed[editUserID] != undefined ){
            if(newRecordId != editUserID) {
              let formData = new FormData();
              Object.entries(changed[editUserID]).map( key => {
                  formData.append( key[0], key[1] );
              })
              props.updateLawyer(formData, editUserID);
            } else {
              let checkRow = rows.filter(row => {
                return newRecordId === parseInt(row.id);
              }); 
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
                  props.addLawyer(formData);
                  setNewRecordId(0);
                }              
              }
            }
          }            
      }
      if (deleted) {
          changedRows = deleteRows(deleted);
      }

      setRows(changedRows);
  };

  const addEmptyRow = () => commitChanges({ added: [{}] });

  /**
   * <SortingState
                                  defaultSorting={[
                                      { columnName: 'first_name', direction: 'asc' },
                                  ]}
                                  sorting={sorting}
                                  onSortingChange={getSorting}
                              />
   */

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
                    startEditAction={"click"}
                    selectTextOnEditStart={false}
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
    lawyerList: state.patenTrack.lawyerList
  };
};

const mapDispatchToProps = {
  getLawyers,
  addLawyer,
  updateLawyer,
  deleteLawyer
};

export default connect(mapStateToProps, mapDispatchToProps)(Lawyers);