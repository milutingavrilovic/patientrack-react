import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  transactionsContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%'
  },
  container: {
    backgroundColor: theme.color.background,
    margin: 5,
    color: 'white',
    border: '1px solid #363636',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  typography: {
    lineHeight: 2,
    fontSize: '1.2rem',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 10px'
  },
  typographyExpand: {
    lineHeight: 2,
    fontSize: '2.2rem',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 10px'
  },
  heading: {
    paddingBottom: theme.spacing(1),
    fontSize: '1.375rem',
    textAlign: 'center',
    margin: 0
  },
  headingExpand: {
    paddingBottom: theme.spacing(2),
    fontSize: '3.375rem',
    textAlign: 'center',
    margin: 0
  },
  context: {
    display: 'flex',
    flexDirection: 'column'
  },
  contextExpand: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 500,
    margin: '0 auto'
  },
  wrapper: {
    width: '100%'
  },
  wrapperExpand: {
    width: '100%',
    minHeight: 500
  }
}));