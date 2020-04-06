import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    color: 'white',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    position: 'relative',
    backgroundColor: '#222222',
    margin: 4
  },
  content: {
    maxWidth: 500,
    margin: '0 auto',
    width: '100%'
  },
  header: {
    fontSize: 30,
    fontWeight: 700,
    textAlign: 'center',
    color: 'white',
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column'
  },
  itemsCount: {
    fontSize: 40,
    fontWeight: 700,
    textAlign: 'center',
    margin: 0
  },
  typography: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    fontSize: 18
  },
  value: {
    flexGrow: 1,
    textAlign: 'right',
    wordBreak: 'break-all'
  },
  gridItem: {
    paddingBottom: theme.spacing(0.5),
    fontSize: 12
  }
}));