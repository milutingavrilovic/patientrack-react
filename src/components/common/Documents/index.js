import React, { useState, useEffect, forwardRef  } from 'react';
import {connect} from 'react-redux';
import useStyles from "./styles";
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  AddBox,
  ArrowDownward, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Clear, 
  DeleteOutline, 
  Edit, 
  FilterList, 
  FirstPage, 
  LastPage, 
  Remove, 
  SaveAlt, 
  Search, 
  ViewColumn
} from '@material-ui/icons';


import { getDocuments, addDocument, updateDocument, deleteDocument } from "../../../actions/patenTrackActions";

function Documents(props) {
  const classes = useStyles();
  const [state, setState] = useState([]);
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  const options = {
    paging: false,
    search: false,
    maxBodyHeight: props.height * 39  / 100
  };

  const [file, setFile] = useState("");

  const onFileChange  = (e) => {
    /*console.log(e, e.target, e.target.files);*/
    if(e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  const columns = [
    { field: 'name', title: 'Name'},
    { field: 'file', title: 'File',
      render: rowData => <a target={"_BLANK"} href={rowData.file} className={classes.open}>Open</a>,
      editComponent: () => (
        <div>
          <input
            id="file"
            type="file"
            onChange={onFileChange}
          />            
        </div>
      )
    },
    { field: 'description', title: 'Description'}
  ];

  useEffect(() => {
    if( props.documentList.length > 0 ) {
      
      setState({
        columns: columns,
        data: props.documentList
      });
    }

    if(props.update_document_row != null ) {      
      props.documentList.map((row, index) => {
        if(row.id == props.update_document_row.id) {
          props.documentList[index] = props.update_document_row;
          return false;
        }
      })      
      console.log("changedRows", props.documentList);
      setState({...state, data: props.documentList})
    }

  },[props.documentList, props.update_document_row]);

  const errorProcess = (err) => {
    console.log("error", err);
  };

  return (
    <div
      className  = {classes.userItemsContainer}
    >
      <div className={classes.container}>
        <div className={classes.scrollbar}
          style={{height: props.height * 39  / 100}}
        >
          {      
            <MaterialTable
              title=""
              icons={tableIcons}
              columns={state.columns}
              data={state.data}
              options={options}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    console.log("newData", newData);
                    if(file != "" && file != null) {
                      let formData = new FormData();
                      Object.entries(newData).map( key => {
                        if(key[0] != 'tableData') {
                          formData.append( key[0], key[1] );                                                  
                        }                  
                      });
                      formData.append("file", file );
                      props.addDocument(formData);
                      setTimeout(() => {
                        resolve();
                        setFile("");
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data.push(newData);
                          console.log("onRowAdd", newData);
                          return { ...prevState, data };
                        });
                      }, 600);
                    }                    
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    if(oldData) {
                      let formData = new FormData();
                      let editUserID = 0;
                      Object.entries(newData).map( key => {
                        if(key[0] != 'tableData') {
                          if(key[0] == 'id') {
                            editUserID = key[1];
                          } else {
                            formData.append( key[0], key[1] );                           
                          }                          
                        }                  
                      });
                      if( editUserID > 0 ) {
                        if(file != "" && file != null) {
                          formData.append("file", file );
                        }
                        props.updateDocument(formData, editUserID);
                        setTimeout(() => {
                          resolve();
                          if (oldData) {
                            setState((prevState) => {
                              const data = [...prevState.data];
                              data[data.indexOf(oldData)] = newData;
                              console.log("onRowUpdate", newData);
                              return { ...prevState, data };
                            });
                          }
                        }, 600);
                      }
                    }                    
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    if(oldData.id > 0) {
                      props.deleteDocument( oldData.id );    
                      setTimeout(() => {
                        resolve();
                        setState((prevState) => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            console.log("onRowDelete", oldData);
                            return { ...prevState, data };
                          });
                      }, 600);
                    }                    
                  }),
              }}
            />
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
  deleteDocument
};

export default connect(mapStateToProps, mapDispatchToProps)(Documents);