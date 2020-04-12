import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  logotype: {
    fontWeight: 400,
    fontSize: '1.6994866rem',
    lineHeight: '1.3875',
    letterSpacing: 0,
    fontKerning: 'normal',
    margin: 0,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.color.background,
    margin: 5,
    position: 'initial',
    width: 'initial',
    border: '1px solid #363636',
    color: theme.color.lightGray
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    height: 44,
    minHeight: 44,
    position: 'relative'
  },
  hide: {
    display: "none",
  },
  grow: {
    flexGrow: 1,
  },
  headerMenu: {
    position: 'absolute',
    top: 'calc(100% + 5px)',
    background: 'black',
    width: 400,
    border: '2px solid #2b2b2b',
    right: 0,
    boxShadow: '0px 22px 15px -15px #363636;'
  },
  headerMenuItem: {
    paddingLeft: theme.spacing(2),
    lineHeight: '60px',
    fontSize: '1.6rem',
    height: 60,
    borderBottom: '1px solid #262626',
    borderTop: '1px solid #262626',
    marginLeft: 3,
    cursor: 'pointer'
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
  headerIcon: {
    fontSize: '2rem',
    color: "rgba(255, 255, 255)",
    lineHeight: 1.2
  },
  badge: {
    height: 10,
    width: 10
  }
}));
