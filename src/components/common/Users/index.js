import React, { useState, useEffect, forwardRef  } from 'react';
import {connect} from 'react-redux';
import useStyles from "./styles";
import MaterialTable from 'material-table';
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


import { getUsers, addUser, updateUser, deleteUser } from "../../../actions/patenTrackActions";

function Users(props) {
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
    maxBodyHeight: props.height * 39  / 100,
    addRowPosition: 'first',
    toolbarButtonAlignment: 'left'
  };

  useEffect(() => {
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
          role: user.role.name == 'Admin' ? 0 : 1
        };
        data.push( record );
      });
    }
    const columns = [
      { field: 'first_name', title: 'First Name'},
      { field: 'last_name', title: 'Last Name'},
      { field: 'job_title', title: 'Title'},
      { field: 'email_address', title: 'Email'},
      { field: 'telephone', title: 'Telephone'},
      { field: 'telephone1', title: 'Telephone'},
      { field: 'role',
        title: 'Type',
        lookup: { 0: "Admin", 1: "Manager" }
      }
    ];
    setState({
      columns: columns,
      data: data
    });
  },[props.userList]);

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
              localization={{
                header: {
                  actions: '#'
                }
              }}
              title=""
              icons={tableIcons}
              columns={state.columns}
              data={state.data}
              options={options}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    if(newData.email_address != "" && newData.email_address != null) {
                      let formData = new FormData();
                      Object.entries(newData).map( key => {
                        if(key[0] != 'tableData') {
                          formData.append( key[0], key[1] );
                        }                  
                      });
                      props.addUser(formData);
                      setTimeout(() => {
                        resolve();
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
                        props.updateUser(formData, editUserID);
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
                      props.deleteUser( oldData.id );    
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
                  })
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
