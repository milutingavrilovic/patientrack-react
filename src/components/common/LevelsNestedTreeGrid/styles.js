import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  nestedTree: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: 400
  },
  container: {
    backgroundColor: theme.color.background,
    margin: 5,
    color: 'white',
    flexGrow: 1,
    overflow: 'hidden',
    height: '100%',
    border: '1px solid #363636',
  },
  typography: {
    lineHeight: 2,
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  list: {
    height: '100%',
    padding: 5
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start !important',
    color: '#d6d6d6',
    fontSize: '1.2019rem',
    padding: '5px 0 0 5px !important',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 1.5
  }
}));