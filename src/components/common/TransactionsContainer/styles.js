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
    fontSize: 14,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  heading: {
    paddingBottom: theme.spacing(2)
  },
  value: {
    fontSize: 30
  },
  transactonWrapper: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}));