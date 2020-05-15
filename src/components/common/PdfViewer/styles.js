import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  pdfContainer: {
    flexGrow: 1,
    position: 'relative',
    width: '100%',
    zIndex: 9999
  },
  pdfWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  scrollbar: {
    flexGrow: 1,
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },
  container: {
    backgroundColor: theme.color.background,
    margin: '5px 5px 0px 5px',
    color: 'white',
    flexGrow: 1,
    height: '100%',
    border: '1px solid #363636',
    position: 'relative',
    overflow: 'hidden'
  }  ,
  outsource:{
    width: '100%',
    border: '0px'
  }

}));
