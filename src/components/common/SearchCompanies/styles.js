import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        backgroundColor: theme.color.background,
        margin: '0 10px 10px 0px',
        padding: `0 1rem`,
        color: theme.color.lightGray,
        border: '1px solid #363636',
        display: 'flex',
        position: 'relative',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 60
    },
    searchContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        zIndex: 1002
    },
    scrollbar: {
        flexGrow: 1,
        overflow: 'hidden',
        position: 'relative',
        '& .MuiPaper-root': {
            backgroundColor: 'inherit'
        },
        marginTop: '2px'
    },
    context: {
        backgroundColor: theme.color.background,
        width: '100%',
        margin: '0 auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        '& .MuiCollapse-container': {
            position: 'absolute',
            zIndex: 9
        }
    },
    input:{
        color: theme.color.lightGray,
    },
    form:{
        '& .MuiInputLabel-root':{
            color: '#ffffff !important',
            fontWeight: 700,
            /* fontFamily: 'inherit' */        
        },
        '& .MuiFormControl-root':{
            width: '90%'
        }
    },
    iconRelative: {
        position: 'relative',
        top: '22px',
        cursor: 'pointer'
    },
    left:{
        left: '15px'
    }
}));