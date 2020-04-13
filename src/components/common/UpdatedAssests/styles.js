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
    fontSize: 'inherit',
    paddingBottom: 'inherit',
    alignSelf: 'center',
  },
  headingExpand: {
    padding: '2rem',
    fontSize: '3.2rem',
    alignSelf: 'center',
    color: theme.color.lightgray
  },
  context: {
    padding: '0 4px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    lineHeight: 1.2,
    fontWeight: 500,
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
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontSize: '1.2rem',
    color: theme.color.white,
    padding: '0.5rem',
  },
  wrapperExpand: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 50,
    alignSelf: 'flex-start'
  },
  value: {
    padding: 'inherit'
  }
}));