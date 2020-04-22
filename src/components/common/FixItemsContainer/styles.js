import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  fixItemsContainer: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    zIndex: 1000
  },
  container: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    bottom: 0
  },
  context: {
    border: '1px solid #363636',
    backgroundColor: theme.color.background,
    width: '100%',
    margin: '0 auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  scrollbar: {
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative'
  },
  headerWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    margin: 0
  },
  gridItem: {
    fontSize: '1rem',
    color: theme.color.lightGray,
    lineHeight: 1.2,
    padding: '2px 10px',
  },
  gridItemExpand: {
    fontSize: '1rem',
    color: theme.color.lightGray,
    lineHeight: 1.2,
    padding: '5px 10px',
    width: 'calc(100% / 8)',
    borderRight: '1px solid #363636',
    wordBreak: 'break-all'
  },
  telephone: {
    color: theme.color.white,
  },
  created_dt: {
    color: theme.color.lightGray,
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