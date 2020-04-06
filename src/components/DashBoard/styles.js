import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  dashboard: {
    position: 'relative',
    flexGrow: 1
  },
  dashboardContainer: {
    position: 'relative',
    flexGrow: 1,
    flexDirection: 'column',
    display: 'flex'
  },
  container: {
    backgroundColor: 'black',
    padding: 4,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    [theme.breakpoints.down("md")]: {
      height: 'auto !important'
    }
  },
  widget: {
    backgroundColor: '#222222',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  }
}));