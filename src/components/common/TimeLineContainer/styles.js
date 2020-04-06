import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  timeLineContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    [theme.breakpoints.down("md")]: {
      minHeight: 450
    }
  },
  container: {
    backgroundColor: '#222222',
    margin: 4,
    color: 'white',
    flexGrow: 1
  }
}));
