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
    display: 'flex',
    alignItems: 'center',
    marginLeft: '14px'
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
    padding: 0,
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
    marginTop: theme.spacing(7),
    marginRight: theme.spacing(7),
  },
  headerMenuButton: {
    marginLeft: '0.5rem',
    padding: '1rem',
  },
  headerIcon: {
    fontSize: '2rem',
    color: theme.color.lightGray,
    lineHeight: 1.2
  },
  badge: {
    height: 10,
    width: 10
  },
  profileMenu: {
    position: 'absolute',
    top: 'calc(100% - 2px)',
    background: 'black',
    border: '1px solid #2b2b2b',
    borderTop: 'none',
    right: 0,
    boxShadow: '5px 5px 3px -3px rgba(120,120,120,.3)',
    textAlign: 'left'
  },
  profileMenuItem: {
    padding: '0.5rem',
    lineHeight: '1.5',
    fontSize: '1rem',
    borderTop: '1px solid #262626',
    cursor: 'pointer',
    display: 'flex',
    position: 'relative',
    borderLeft: '3px solid transparent'
  },
  userlogo: {
    width: '3rem',
    alignSelf:'center',
  },
  companyLogo: {
    height: '32px',
    width: '32px'
  },
  siteLogo: {
    height: '3rem'
  },
  headerMenuIcon: {
    fill: 'currentColor',
    transition: '.3s',
    transformOrigin: '50% 50%',
    transform: 'rotate(0)',
    filter: 'invert(75%)'
  },
  headerTitle: {
    overflow: 'hidden',
    marginLeft: '14px',
    flexGrow: 1,
  },
  headerTitleContent: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '1.6994866rem',
    ['@media (max-width:859px)']: {
      fontSize: '1.503565rem',
    },
    ['@media (max-width:479px)']: {
      fontSize: '1.328125rem',
    },
    lineHeight: 1.3875
  }
}));
