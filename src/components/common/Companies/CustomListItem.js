import React, { useState } from 'react';
import {connect} from 'react-redux';
import { ArrowRight, ArrowDropDown } from "@material-ui/icons";
import { withStyles } from '@material-ui/core/styles';
import { red  } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import useStyles from "./styles";
import { getSubCompanies, setCompanyTreeOpen, resetCompanyTree, deleteSameCompany, deleteCompany, setSelectedCompany, setMainCompanyChecked } from "../../../actions/patenTrackActions";
import { signOut } from "../../../actions/authActions";

const RedRadio = withStyles({
    root: {
      color: red [400],
      '&$checked': {
        color: red [600],
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


function CustomListItem(props) {
    const {depth} = props;
    const classes = useStyles();
    const name = (props.normalize_name != '' && props.normalize_name != null) ? props.normalize_name : props.name;

    const [subCompanyChecked, setSubCompanyChecked] = useState( false );
    const [selectedSubCompany, setSelectedSubCompany] = useState( "" );



    
    const getFontSize = () => {
        if(props.screenHeight < 500 || props.screenWidth < 992)
          return 8;
        if(props.screenHeight < 700 || props.screenWidth < 1200)
          return 12;
        if(props.screenHeight < 900 || props.screenWidth < 1400)
          return 14;
        return 16;
    };

    const errorProcess = (err) => {
        if(err !== undefined && err.status === 401 && err.data === 'Authorization error') {
          props.signOut();
          return true;
        }
        return false;
      };

    const deleteSameCompany = (value) => () => {
        console.log("Delete SameCompany"+ value);

        props.deleteSameCompany( value, props.selected_company );

    }

    const deleteCompany = (value) => () => {
        console.log("Delete deleteCompany"+ value);
        props.deleteCompany(value);
    }

    const showChildItems = (data) => {
        return (
            <ul className={classes.children}>
                {data.map( (c, index) => {
                    const labelId = `checkbox-list-label-${index}`;
                    return(
                        <li  key={index}>
                           <a 
                                onClick={(event) => {
                                    subCompanySelect(event)
                                }}
                                className={selectedSubCompany === c.name ? classes.selected_sub_company : ''}
                            >
                                {`${c.name}`}
                            </a> {`(${c.counter})`}
                        </li>
                    )                    
                })}    
            </ul>
        )
    };

    const mainCompanySelect = (e) => {
        console.log(`Selected main company`);
        if(e.target.classList.contains('selected_company')) {
            props.setMainCompanyChecked( false );
            props.setSelectedCompany('');
        } else {
            props.setMainCompanyChecked( true );
            props.setSelectedCompany(e.target.text);
        }
        /*props.setMainCompanyChecked(e.target.checked);
        props.setSelectedCompany(e.target.checked ? e.target.value : '');*/
    };

    const subCompanySelect = (e) => {
        console.log(`Selected sub company ${e.target.text}`);
        if(e.target.classList.contains('selected_sub_company')) {
            setSubCompanyChecked( false );
            setSelectedSubCompany('');
        } else {
            console.log("Adasdasd");
            setSubCompanyChecked( true );
            setSelectedSubCompany(e.target.text);
            console.log(selectedSubCompany, subCompanyChecked);
        }
    }

    /**
     * <RedRadio
                edge="start"
                checked={props.selected_company === name ? props.isOpened : false}
                tabIndex={-1}
                disableRipple
                value={name}
                name="selected_company"
                
            />
     */
    return (
        <li
        className={classes.listItem}
        >
        <div style={{display: 'flex'}}
        >
        <span
            style={{
            paddingLeft: depth === 1 ? '1rem' : 0,
            }}
            onClick={() => {
                props.resetCompanyTree();
                setSubCompanyChecked( false );
                setSelectedSubCompany('');
                if(props.isOpened) {
                    console.log('test');                    
                    props.setCompanyTreeOpen(name, !props.isOpened);
                    return;
                }
                props.setCompanyTreeOpen(name, !props.isOpened);
                props.getSubCompanies( name ).catch(err => errorProcess({...err}.response));   
            }}
        >
        {
            props.isOpened ? <ArrowDropDown/> : <ArrowRight/>
        }   
            <a 
                onClick={(event) => {
                    mainCompanySelect(event)
                }}
                className={props.selected_company === name && props.isOpened ? classes.selected_company : ''}
            >
                { `${name}`}
            </a>
        </span>
        <a className={classes.delete} onClick = {deleteCompany(name)}><i className={"fad fa-trash"}></i></a>
        </div>
        {
            (props.isOpened && props.child)
            ?
                showChildItems(props.child)
            :
            ''
        }
        </li>    
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        ...ownProps,    
        child: state.patenTrack.childCompanies[ownProps.name] ? state.patenTrack.childCompanies[ownProps.name] : [],
        isOpened: state.patenTrack.company_tree[ownProps.name] ? state.patenTrack.company_tree[ownProps.name] : false,
        selected_company: ownProps.name ? ownProps.name : '',
        main_company_selected: state.patenTrack.main_company_selected ? state.patenTrack.main_company_selected : false
    }
}

const mapDispatchToProps =  {
    getSubCompanies,
    setCompanyTreeOpen,
    resetCompanyTree,
    deleteSameCompany,
    deleteCompany,
    setMainCompanyChecked,
    setSelectedCompany,
    signOut
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomListItem);