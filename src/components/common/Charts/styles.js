import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  charts: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%'
  },
  container: {
    color: 'white',
    flexWrap: 'wrap',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 1200,
  },
  chatsContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 5,
    border: '1px solid #363636',
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
    height: 300,
    width: '100%',
    backgroundColor: '#222',
    border: '1px solid #363636'
  }
}));