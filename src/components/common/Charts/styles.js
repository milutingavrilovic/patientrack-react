import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    backgroundColor: '#222222',
    padding: theme.spacing(0.5),
    color: 'white',
    flexWrap: 'wrap',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'space-around'
  },
  chatsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: 4,
    position: 'relative',
    flexGrow: 1
  },
  chartWrapper: {
    maxWidth: 900,
    margin: '0 auto'
  },
  typography: {
    lineHeight: 2,
  },
  chart: {
    width: '50%',
    height: '50%'
  },
  gridItem: {

  }
}));