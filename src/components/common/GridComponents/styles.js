import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  gridComponents: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flexGrow: 1
  },
  container: {
    backgroundColor: theme.color.background,
    margin: 5,
    padding: theme.spacing(2),
    color: 'white',
    height: '100%',
    position: 'relative',
    flexGrow: 1,
    border: '1px solid #363636',
  },
  typography: {
    fontSize: '.975rem',
    paddingBottom: theme.spacing(2),
  }
}));