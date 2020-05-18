import React, { useState, useRef  } from "react";
import {connect} from 'react-redux';
import useStyles from "./styles";
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Loader from "../Loader";
import Paper from "@material-ui/core/Paper";
import {SortingState, IntegratedSorting, SelectionState, } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  VirtualTable,
} from "@devexpress/dx-react-grid-material-ui";
import { searchCompany, addCompany, setSearchCompanies, setSearchCompanyLoading, cancelRequest, setSelectedSearchCompanies  } from "../../../actions/patenTrackActions";


function SearchCompanies(props) {
  const classes = useStyles();
  const inputEl = useRef(null);
  const [checked, setChecked] = useState([]);
  const [timeInterval, setTimeInterval] =  useState( null );
  const [cancelTokenSource, setCancelTokenSource] = useState("");
  const WAIT_INTERVAL = 500;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    console.log("newChecked", newChecked);
    if(newChecked.length > 0) {
      newChecked.map( company => {
        let form = new FormData();
        form.append("name", company);
        if(props.main_company_selected === true) {
          form.append("parent_company", props.main_company_selected_name);
        }
        props.addCompany(form);
      })
    }
  };

  
  const [columns] = useState([
    { name: "name", title: "Name" },
    { name: "counter", title: "Count" }
  ]);
  const [sorting, getSorting] = useState([]);

  const [rows, setRows] = useState([]);

  const [selection, setSelection] = useState([]);

  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    if(props.searchCompanies && props.searchCompanies.length > 0 ){
      setRows(props.searchCompanies);
    }
  },[props.searchCompanies]);

  const handleSearchCompany = (event) => {    
    /**event.target.value giving old value in setimeout */
    clearTimeout(timeInterval);
    setTimeInterval(setTimeout(() => {
      if(inputEl.current.querySelector("#search_company").value.length > 2) {
        props.searchCompany(inputEl.current.querySelector("#search_company").value );
      } else {
        props.setSearchCompanyLoading( false );
        props.setSearchCompanies( [] );
        props.cancelRequest();
      }      
    }, WAIT_INTERVAL));  
  }

  const getRowId = row => row.name;

  const addCompany = () => {
    console.log("selection", selection);
    if( selection && selection.length > 0) {
      let form = new FormData();
      form.append("name", JSON.stringify(selection));
      props.addCompany(form);
    }
  }

  /*const updateSelection = (d) => {
    if(d.length > 0) {
      const newValue = [d[d.length-1]];
      setSelection(newValue);
      addCompany(newValue[0]);
    } else {
      setSelection(d);
    }    
  };*/

  const updateSelection = (d) => {
    setSelection(d);
    props.setSelectedSearchCompanies(d);
  }

  const selectParentCompany = () => {
    /** */
    if( selection && selection.length > 0) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else {
      /** */
    }    
  }

  return (
    <div
      className={classes.searchContainer}
    >
      <div
        className={classes.container}
      >
         <div className={classes.context}>
          <Collapse in={open}>
            <Alert severity="warning">
              Please selected parent company
            </Alert>
          </Collapse>
          <form noValidate autoComplete="off" className={classes.form}>
            <TextField id="search_company" name="search_company" ref={inputEl} label="Enter a Company Name to Search" onChange={handleSearchCompany}/>
            <a onClick={addCompany} title="Click to create a parent" className={classes.iconRelative}><i className={"fas fa-plus"}></i></a>
            <a onClick={selectParentCompany} title="Click to associate a parent" className={`${classes.iconRelative} ${classes.left}`}><i className={"far fa-layer-plus"}></i></a> 
          </form>
          <div className={`search-list ${classes.scrollbar}`} >
            {
              props.isLoading
              ?
              <Loader/>
              :
              <PerfectScrollbar
                options={{
                  suppressScrollX: true,
                  minScrollbarLength: 20,
                  maxScrollbarLength: 25
                }}
              >
                {
                  props.searchCompanies.length > 0
                  ?                  
                    <Paper style={{ height: props.height - 157 }}>
                      <Grid
                        rows={rows}
                        columns={columns}
                        getRowId={getRowId}
                      >
                        <SelectionState
                          selection={selection}
                          onSelectionChange={setSelection}
                        />
                        <SortingState
                          defaultSorting={[]}
                          sorting={sorting}
                          onSortingChange={getSorting}
                        />          
                        <IntegratedSorting />  
                        <VirtualTable height={props.height - 157}/>
                        <TableHeaderRow showSortingControls/>
                        <TableSelection
                          selectByRowClick
                        />
                      </Grid>
                    </Paper>
                    :
                    ''
                  }
              </PerfectScrollbar>
            }
          </div>
        </div> 
      </div>
    </div>
  );
}

const mapStateToProps = state => {
    return {
      width: state.patenTrack.screenWidth,
      height: state.patenTrack.screenHeight,
      isLoading: state.patenTrack.searchCompanyLoading,
      searchCompanies: state.patenTrack.searchCompanies,
      main_company_selected: state.patenTrack.main_company_selected,
      main_company_selected_name: state.patenTrack.main_company_selected_name
    };
  };
  
  const mapDispatchToProps = {
    searchCompany,
    addCompany,
    setSearchCompanyLoading,
    setSearchCompanies,
    setSelectedSearchCompanies,
    cancelRequest
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchCompanies);