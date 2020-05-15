import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  recordItemsContainer: {
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
    position: 'relative',
    /*marginTop: 10*/
  },
  displayBlock: {
    display: 'block'
  },
  ellipsis:{
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '95%',
  },
  headerWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 80,
  },
  header: {
    /* fontSize: '1.2rem',
    fontWeight: 300, */
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
    /* fontSize: '4.5rem',
    fontWeight: 700, */
    textAlign: 'center',
    /* lineHeight: 'normal', */
    margin: 0,
    color: theme.color.green
  },
  gridItem: {
    /* fontSize: '1rem', */
    color: theme.color.white,
    /* lineHeight: 1.2, */
    padding: '2px 10px',
  },
  gridItemExpand: {
    /* fontSize: '1rem', */
    color: theme.color.lightGray,
    /* lineHeight: 1.2, */
    padding: '5px 10px',
    width: 'calc(100% / 8)',
    borderRight: '1px solid #363636',
    wordBreak: 'break-all'
  },
  telephone: {
    color: theme.color.lightGray,
    padding: '2px 10px',
    width: '40%',
  },
  created_dt: {
    color: theme.color.green,
    width: '100%'
  },
  name: {
    width: '48%',
    color: theme.color.lightGray,
    padding: '2px 10px 2px 0',
    textAlign: 'right',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 10
    //padding: '0 2rem',
  },
  wrapper: {
    width: '100%',
    padding: '0 0.5rem',
    height: '100%',
  },
  tableContainer: {
    backgroundColor: theme.color.background,
    color: 'white',
    display: 'flex',
    position: 'relative',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'normal',
    minHeight: '16vh'
  },
  sortTable:{
    '& th': {
      textDecoration: 'underline'
    }
  }
}));

export const useMatStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  tableExpanded: {
    paddingLeft: 10,
    paddingRight: 10
  },
  enhancedTableContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  tablehHeaderRow: {
    borderTopColor: theme.color.lightGray,
  },
  tableBodyRowCell: {
    border: `1px solid #363636`
  },
  tableHeader: {
    color: theme.color.lightGray,
    paddingLeft:0,
    paddingRight:0,
    paddingTop: 5,
    paddingBottom: 5,
    border: `1px solid #5c5c5c`
  },
  tableHeaderShort: {
    color: theme.color.lightGray,
    border: 0,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 0,
    paddingRight: 0,
    '&:last-child': {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 0,
      paddingRight: 10
    },
    '&:first-child': {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 10,
      paddingRight: 0
    }
  },
  tableCellCollapse: {
    color: theme.color.lightGray,
    paddingLeft:0,
    paddingRight:0,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: `1px solid #5c5c5c`,
    '&:last-child': {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      paddingRight: 10
    },
    '&:first-child': {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 0
    }
  },
  borderZero: {
    border: 0
  },
  smallTableCell: {
    color: theme.color.lightGray,
    border: 0,
    padding: `5px 10px`,
    '&:last-child': {
      padding: `5px 10px`,
    }
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  smallTableBox: {
    height: 30
  },
  zeroMargin: {
    margin: 0
  },
  marginTop15: {
    marginTop: 15
  },
  errorTableContainer: {
    overflowX: 'initial'
  }
}));