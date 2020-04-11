import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    backgroundColor: theme.color.background,
    margin: 5,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: 'white',
    border: '1px solid #363636',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    flexGrow: 1
  },
  validateContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flexGrow: 1
  },
  value: {
    color: '#e60000'
  },
  title: {
    fontSize: '1.6rem',
    color: theme.color.white,
    lineHeight: 1.5,
    padding: `${theme.spacing(1)}px 0`,
    textAlign: 'center'
  },
  titleExpand: {
    fontSize: '3.6rem',
    color: theme.color.white,
    lineHeight: 1.5,
    padding: `${theme.spacing(2)}px 0`,
    textAlign: 'center'
  },
  body: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingBottom: theme.spacing(1),
    lineHeight: 1.5,
    fontSize: '1.3rem',
  },
  bodyExpand: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '60%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    margin: '0 auto',
    lineHeight: 1.5,
    fontSize: '2.3rem',
  }
}));