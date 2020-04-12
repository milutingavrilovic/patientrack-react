import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  timeLineContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: 300,
    width: '100%'
  },
  container: {
    backgroundColor: theme.color.background,
    margin: '5px 5px 0 5px',
    color: 'white',
    flexGrow: 1,
    height: '100%',
    border: '1px solid #363636',
  },
  outsource: {
    fontSize: '1.2rem',
    border: 0,
    width: '100%',
    height: '100%',
  },
  outSourceWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  padding: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
}));
