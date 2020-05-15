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
import { withStyles } from '@material-ui/core/styles';

import { EditingState, SortingState, IntegratedSorting} from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableEditColumn, TableEditRow, TableInlineCellEditing, VirtualTable} from '@devexpress/dx-react-grid-material-ui';

import { getDocuments, addDocument, updateDocument, updateDocumentRow, deleteDocument } from "../../../actions/patenTrackActions";


/*const LookupEditCellBase = ({
    onValueChange, value, classes,
  }) => (
    <TableCell
      className={classes.lookupEditCell}
    >
        <input
            style={{ display: 'none' }}
            id="file"
            name="file"
            value={value}
            onChange={event => onValueChange(event.target.value)}
            type="file"
        />
        <label htmlFor="file">
            <Button variant="raised" component="span" className={classes.button}>
                Upload
            </Button>
        </label>      
    </TableCell>
  );
  export const LookupEditCell = withStyles(useStyles, { name: 'LookupEditCell' })(LookupEditCellBase);*/

const FocusableCell = ({ onClick, ...restProps }) => (
  <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
);

function Documents(props) {
    const classes = useStyles();

    const getRowId = row => row.id;

    const [columns] = useState([
        { name: 'name', title: 'Name' },
        { name: 'file', title: 'File' },
        { name: 'description', title: 'Description' },
    ]);

    const [editingCells, setEditingCells] = useState([]);

    /*const [sorting, getSorting] = useState([{ columnName: 'name', direction: 'asc' }]);*/
    const [sorting, getSorting] = useState([]);

    const [newRecordId, setNewRecordId] = useState(0);

    const [deleteRow, setDeleteRow] = useState(0);

    const [rows, setRows] = useState( props.documentList );

    const [updateRow, setUpdateRow] = useState(0);

    if(props.documentList.length != rows.length && props.documentList.length > 0 && deleteRow === 1) {
      console.log("SETROWS");
      setRows(props.documentList)
    }

    if(props.update_document_row != null && updateRow == 0) {      
      props.documentList.map((row, index) => {
        if(row.id == props.update_document_row.id) {
          props.documentList[index] = props.update_document_row;
        }
      })      
      console.log("changedRows", props.documentList);
      setRows(props.documentList);     
      setUpdateRow(1); 
    }


    const uploadFile = (event, row) => {
      console.log(event, row);
      const files = event.target.files;
      console.log(files);
      console.log(newRecordId);
      if(files.length > 0){
        const checkRow = row.row;
        let formData = new FormData();
        console.log(checkRow, checkRow);
        Object.entries(checkRow).map( key => {
          if(key[0] != 'id') {
            formData.append( key[0], key[1] );
          }                  
        })    
        formData.append( "file", files[0] );
        if(row.rowId == newRecordId) {
          /**new record */          
          props.addDocument(formData);
          setNewRecordId(0);  
          setEditingCells([]);
          setDeleteRow(1);
          setRows([]);
        } else {          
          setUpdateRow(0);
          props.updateDocument(formData, row.rowId);          
          setTimeout(() => {
            props.getDocuments();
            setEditingCells([]);
            setDeleteRow(1);
            setRows([]);
          },1000);
        }
      }      
    }
  
    const LookupEditCell = (options) =>{  
      return (
        <TableCell
        >
            <input
              style={{ display: 'none' }}
              id="file"
              name="file"
              onChange={(event) => {
                console.log(event.target, event.target.value);
                uploadFile(event, options.tableRow);
              }}
              type="file"
            />
            <label htmlFor="file">
                <Button component="span">
                    Upload
                </Button>
            </label>      
        </TableCell>
      );
    } 
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
        const { column } = props;
        if (column.name == "file") {
          console.log(props);
          return <LookupEditCell {...props}  />;
        }
        const newProps = {...props};
        newProps.value = newProps.value == null ? '' : newProps.value;
        console.log("props", newProps);
        return <TableEditRow.Cell {...newProps} />;
    };

    const deleteRows = (deletedIds) => {
        const rowsForDelete = rows.slice();
        setDeleteRow(0);
        console.log("deletedIds", deletedIds);
        props.deleteDocument( deletedIds[0] );
        if(newRecordId != deletedIds[0]){
          props.deleteDocument( deletedIds[0] ); 
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
            if(changed[editUserID] != undefined) {
              if(newRecordId != editUserID) {
                let formData = new FormData();
                Object.entries(changed[editUserID]).map( key => {
                    formData.append( key[0], key[1] );
                })
                props.updateDocument(formData, editUserID);
              } else {
                let checkRow = rows.filter(row => {
                  return newRecordId === parseInt(row.id);
                }); 
                if(checkRow.length > 0 && typeof checkRow[0].file != 'undefined') {
                  let formData = new FormData();
                  console.log(checkRow, changed[editUserID]);
                  Object.entries(checkRow[0]).map( key => {
                    if(key[0] != 'id') {
                      formData.append( key[0], key[1] );
                    }                  
                  })    
                  Object.entries(changed[editUserID]).map( key => {
                    formData.append( key[0], key[1] );
                  })
                  props.addDocument(formData);
                  setNewRecordId(0);             
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
                              editingCells={editingCells}
                              onEditingCellsChange={setEditingCells}
                              addedRows={[]}
                              onAddedRowsChange={addEmptyRow}
                          />                                
                          <VirtualTable cellComponent={FocusableCell} className={classes.table} height={props.height * 39  / 100}/>
                          <TableHeaderRow showSortingControls/>
                          <TableInlineCellEditing
                              cellComponent={EditCell}
                              selectTextOnEditStart />
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
      documentList: state.patenTrack.documentList,
      update_document_row: state.patenTrack.update_document_row
    };
  };
  
  const mapDispatchToProps = {
    getDocuments,
    addDocument,
    updateDocument,
    updateDocumentRow,
    deleteDocument
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Documents);