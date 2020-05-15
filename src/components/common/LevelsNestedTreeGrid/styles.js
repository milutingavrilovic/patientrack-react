import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  nestedTree: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    zIndex: 2000
  },
  container: {
    position: 'absolute',
    left: 5,
    right: 5,
    top: 5,
    bottom: 5,
    display: 'flex',
    flexDirection: 'column'
  },
  context: {
    backgroundColor: theme.color.background,
    color: 'white',
    flexGrow: 1,
    overflow: 'hidden',
    height: '100%',
    border: '1px solid #363636',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  heading: {
    /* fontSize: '1.2rem', */
    lineHeight: 'normal',
    color: theme.color.lightGray,
    /* padding: '0.375rem 0.375rem 0',
    fontWeight: 700, */
    alignSelf: 'center'
  },
  headingExpand: {
    /* fontSize: '3rem !important', */
    lineHeight: 'normal',
    color: theme.color.lightGray,
    /* padding: '0.75rem 0.75rem 0',
    fontWeight: 700, */
    alignSelf: 'center'
  },
  scrollbar: {
    color: 'white',
    flexGrow: 1,
    overflow: 'hidden',
    height: '100%',
    width: '100%',
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
    padding: '0.375rem !important',
    margin: 0
  },
  listItem: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: '#d6d6d6',
    padding: '0.375rem 0 0 0.375rem !important',
    margin: 0,
    fontStyle: 'normal',
    /* fontWeight: 400,
    lineHeight: 1.5 */
  }
}));