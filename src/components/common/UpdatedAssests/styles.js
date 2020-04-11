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
    padding: theme.spacing(1),
    color: 'white',
    border: '1px solid #363636',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  heading: {
    paddingBottom: theme.spacing(1),
    fontSize: '1.2rem',
    alignSelf: 'center',
    color: theme.color.lightgray
  },
  headingExpand: {
    padding: theme.spacing(2),
    fontSize: '3.2rem',
    alignSelf: 'center',
    color: theme.color.lightgray
  },
  context: {
    padding: '0 10px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    lineHeight: 1.2,
    fontSize: '1.2rem',
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
  }
}));