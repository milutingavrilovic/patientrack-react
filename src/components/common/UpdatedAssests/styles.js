import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    backgroundColor: '#222222',
    borderWidth: 4,
    borderColor: 'black',
    borderStyle: 'solid',
    padding: theme.spacing(2),
    color: 'white',
    height: 150
  },
  typography: {
    lineHeight: 2,
    fontSize: 14
  },
  heading: {
    paddingBottom: theme.spacing(2)
  }
}));