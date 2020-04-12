import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  recordItemsContainer: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%'
  },
  container: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    position: 'relative',
    width: '100%',
    alignItems: 'center'
  },
  content: {
    width: '100%',
    flexGrow: 1,
    display: 'flex'
  },
  wrapper: {
    backgroundColor: theme.color.background,
    width: '100%',
    margin: 5,
    border: '1px solid #363636',
  },
  context: {
    margin: '0 auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  scrollbar: {
    flexGrow: 1,
    overflow: 'hidden',
    height: 200,
    position: 'relative'
  },
  headerWrapper: {
    position: 'relative',
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: '1.2rem',
    fontWeight: 300,
    textAlign: 'center',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  columnItem: {
    borderBottom: '1px solid #5c5c5c',
    display: 'flex',
    flexWrap: 'wrap'
  },
  rowItem: {
    border: '1px solid #5c5c5c',
    width: '100%',
    display: 'flex',
  },
  itemsCount: {
    fontSize: '4.5rem',
    fontWeight: 700,
    textAlign: 'center',
    lineHeight: 'normal',
    margin: 0,
    color: theme.color.green
  },
  gridItem: {
    fontSize: '1rem',
    color: theme.color.white,
    lineHeight: 1.2,
    padding: '2px 10px',
  },
  gridItemExpand: {
    fontSize: '1rem',
    color: theme.color.lightGray,
    lineHeight: 1.2,
    padding: '5px 10px',
    width: 'calc(100% / 8)',
    borderRight: '1px solid #363636'
  },
  telephone: {
    color: theme.color.green,
  },
  created_dt: {
    color: theme.color.green,
  },
  name: {
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 10
    //padding: '0 2rem',
  }
}));