import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  gridComponents: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  container: {
    backgroundColor: '#222222',
    borderWidth: 4,
    borderColor: 'black',
    borderStyle: 'solid',
    padding: theme.spacing(2),
    color: 'white',
    height: '100%',
    position: 'relative',
    width: '100%',
    flexGrow: 1
  },
  typography: {
    lineHeight: 2,
  }
}));