import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  charts: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
   height: '100%'
  },
  container: {
    color: 'white',
    flexWrap: 'wrap',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 1200,
    height: 'calc(100% - 25px)'
  },
  chatsContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    // padding: 5,
    border: '1px solid #363636',
    backgroundColor: '#222222',
    zIndex: 9999,
    height: 'calc(100% - 10px)'
  },
  typography: {
    lineHeight: 2,
  },
  gridItem: {
    width: '50%',
    maxHeight: '50%',
  },
  chart: {
    border: '1px solid #363636',
    margin: 5,
    backgroundColor: theme.color.background,
    position: 'relative',
  },
  loaderWrapper: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#222',
    border: '1px solid #363636'
  }
}));