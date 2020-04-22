import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  updatedAssetContainer: {
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
    border: '1px solid #363636',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    color: theme.color.white
  },
  heading: {
    paddingTop: '1.5rem',
    textAlign: 'center',
    fontSize: '1.375rem',
    margin: 0,
    wordBreak: 'break-word'
  },
  headingExpand: {
    paddingBottom: theme.spacing(2),
    fontSize: '3.375rem !important',
    textAlign: 'center',
    margin: 0
  },
  context: {
    flexWrap: 'wrap',
    lineHeight: 1.2,
    fontWeight: 500,
    padding: '0.5rem 0.5rem 0',
  },
  contextExpand: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    lineHeight: 1.2,
    fontSize: '2.2rem',
    width: '60%',
    fontWeight: 500,
    margin: '0 auto'
  },
  wrapper: {
    width: '100%',
    padding: '0 0.5rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  wrapperExpand: {
    width: '100%',
    paddingTop: 50,
    alignSelf: 'flex-start'
  },
  value: {
    paddingRight: '0.5rem'
  }
}));