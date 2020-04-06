import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  nestedTree: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  container: {
    backgroundColor: '#222222',
    margin: 4,
    color: 'white',
    overflow: 'auto',
    flexGrow: 1
  },
  scrollbar: {
    maxHeight: 450,
    minHeight: 450
  },
  typography: {
    lineHeight: 2,
  },
  listContainer: {
    overflow: 'auto',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  }
}));