import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    backgroundColor: theme.color.background,
    margin: 5,
    padding: `1rem`,
    color: 'white',
    border: '1px solid #363636',
    display: 'flex',
    position: 'relative',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60
  },
  validateContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  value: {
    color: '#e60000'
  },
  title: {
    fontSize: '1.6rem',
    color: theme.color.white,
    lineHeight: 1.5,
    padding: `${theme.spacing(1)}px 0`,
    textAlign: 'center',
    wordBreak: 'break-word'
  },
  titleExpand: {
    fontSize: '3.6rem !important',
    color: theme.color.white,
    lineHeight: 1.5,
    padding: `${theme.spacing(2)}px 0`,
    textAlign: 'center'
  },
  body: {
    lineHeight: 1.5,
    fontSize: '1.5rem',
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
    fontSize: '2.3rem !important',
  },
  wrapper: {
    width: '100%'
  },
  wrapperExpand: {
    width: '100%',
    paddingTop: 50,
    alignSelf: 'flex-start'
  }
}));