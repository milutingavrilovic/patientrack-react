import React, { useState, useEffect  } from "react";
import useStyles from "./styles";
import {connect} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Loader from "../Loader";
import CustomList from "./CustomList";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { GroupingState, SortingState, IntegratedGrouping, IntegratedSorting, SelectionState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  GroupingPanel ,
  Toolbar,
  TableSelection,
  TableGroupRow,
  VirtualTable
} from "@devexpress/dx-react-grid-material-ui";
import { getCompanies, setMainCompanyChecked, setSelectedCompany, deleteCompany, deleteSameCompany } from "../../../actions/patenTrackActions";


function Companies(props) {

  const classes = useStyles();

  const calHeight = parseInt(props.height * 39 / 100) - 3;

  const [columns] = useState([
    { name: "name", title: "Name" },
    { name: "counter", title: "Assignment" },
    { name: "parent", title: " " }
  ]);

  const [sorting, getSorting] = useState([]);

  /*const [rows] = useState( JSON.parse('[{"name":"Sandra","city":"Las Vegas","car":"Audi A4"},{"name":"Paul","city":"Paris","car":"Nissan Altima"},{"name":"Mark","city":"Paris","car":"Honda Accord"},{"name":"Paul","city":"Paris","car":"Nissan Altima"},{"name":"Linda","city":"Austin","car":"Toyota Corolla"},{"name":"Robert","city":"Las Vegas","car":"Chevrolet Cruze"},{"name":"Lisa","city":"London","car":"BMW 750"},{"name":"Mark","city":"Chicago","car":"Toyota Corolla"}]') );*/

  /*const renderCompaniesData = (data) => {
    if(props.isLoading)
      return <Loader/>;
    return (
      <div className={classes.flexColumn}>
        <CustomList data={data} depth={0} parent={[]}/>
      </div>
    );
  };*/

  const [selection, setSelection] = useState([]);
  
  const [rows, setRows] = useState([]);

  const getRowId = row => row.name;

  const updateSelection = (d) => {
    if(d.length > 0) {
      const newValue = [d[d.length-1]];
      setSelection(newValue);
      let findCompany = rows.filter(n => (n.name == newValue[0] && n.name != n.parent)? n : undefined);
      if(findCompany.length == 0) {
        props.setMainCompanyChecked( true );
        props.setSelectedCompany(newValue[0]);
      } else {
        props.setMainCompanyChecked( true );
        props.setSelectedCompany(findCompany[0].parent);
      }
      if(props.searchCompaniesSelected.length > 0) {
        let form = new FormData();
        form.append("name", JSON.stringify(props.searchCompaniesSelected));
        if(props.main_company_selected === true) {
          form.append("parent_company", props.main_company_selected_name);
        }
        props.addCompany(form);
      } else {
        /** */
        console.error("Select child companies...");
      }
    } else {
      setSelection(d);
      props.setMainCompanyChecked( false );
      props.setSelectedCompany( "" );
    }    
  };

  const deleteCompany = () => {
    if(selection.length > 0) {
      if (window.confirm(`Are you sure you want to ${selection[0]}`)) {
        let findCompany = rows.filter(n => (n.name == selection[0] && n.name != n.parent)? n : undefined);
        console.log(selection, findCompany);
        if(findCompany.length == 0) {
          props.deleteCompany(selection[0]);
          props.setMainCompanyChecked( false );
          props.setSelectedCompany( "" );
        } else {
          props.deleteSameCompany( selection[0], findCompany[0].parent );
          props.setMainCompanyChecked( false );
          props.setSelectedCompany( "" );
        }        
      }
    }
  }

  useEffect(() => {
    if(props.companiesList && props.companiesList.length > 0 ){
      setRows(props.companiesList);
    }
    if(props.main_company_selected === true){
      if(selection.length == 0 && props.main_company_selected_name != "") {
        setSelection([props.main_company_selected_name]);
      }
    }
  },[props.companiesList, props.main_company_selected, props.main_company_selected_name]);
  
  const renderDemoData = () => {
    if(props.isLoading)
      return <Loader/>;
    return (
      <Paper style={{ height: '85%'}}>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>   
          <Toolbar />   
          <SelectionState
            selection={selection}
            onSelectionChange={updateSelection}
          />

          <SortingState
						defaultSorting={[]}
						sorting={sorting}
            onSortingChange={getSorting}
            columnSortingEnabled={true}
					/> 
          <GroupingState grouping={[{ columnName: "parent" }]} />
          <GroupingPanel  visible={true} showSortingControls autoExpandAll={true}/>   
          <IntegratedSorting />  
          <IntegratedGrouping />
          <VirtualTable height={'310px'}/>
          <TableHeaderRow allowSorting showSortingControls />
          <TableSelection
            selectByRowClick
            highlightRow
            showSelectionColumn={false}
          />
          <TableGroupRow />
        </Grid>
      </Paper>
    );
  }
  /**{ renderCompaniesData(props.companiesList)} */
    return (
      <div
        className     = {classes.nestedTree}
        style={{height: calHeight}}
      >
      <div className={`list_companies ${classes.container}`}>
        <div className={classes.context} >          
            {
              props.isLoading
              ?
              <Loader/>
              :
              <div className={classes.scrollbar}>
                <span className={classes.heading}>{'My Companies Collections'} <a onClick={deleteCompany} className={classes.delete}><i className={"fad fa-trash"}></i></a></span>
                { renderDemoData()}
              </div>
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
      companiesList: state.patenTrack.companiesList,
      isLoading: state.patenTrack.companyListLoading,
      main_company_selected: state.patenTrack.main_company_selected,
      main_company_selected_name: state.patenTrack.main_company_selected_name,
      searchCompaniesSelected: state.patenTrack.searchCompaniesSelected
    };
  };
  
  const mapDispatchToProps = {
    getCompanies,
    setMainCompanyChecked,
    setSelectedCompany,
    deleteCompany,
    deleteSameCompany
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Companies);