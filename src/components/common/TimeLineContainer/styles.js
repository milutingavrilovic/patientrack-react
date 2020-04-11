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
    margin: 5,
    color: 'white',
    flexGrow: 1,
    height: '100%',
    border: '1px solid #363636',
  },
  outsource: {
    fontSize: '1.2rem',
    color: theme.color.white,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(2)
  }
}));
