import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  dashboard: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  dashboardContainer: {
    position: 'relative',
    flexGrow: 1,
    flexDirection: 'column',
    display: 'flex',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  container: {
    backgroundColor: theme.color.spacing,
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    overflowX: 'hidden',
    overflowY: 'hidden',
    [theme.breakpoints.down("md")]: {
      height: 'auto'
    }
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  }
}));