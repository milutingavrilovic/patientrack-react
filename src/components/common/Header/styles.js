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
    minHeight: 44
  },
  hide: {
    display: "none",
  },
  grow: {
    flexGrow: 1,
  },
  headerMenu: {
    marginTop: theme.spacing(7),
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
  headerIcon: {
    fontSize: '2rem',
    color: "rgba(255, 255, 255, 0.35)",
  },
  badge: {
    height: 10,
    width: 10
  },
  profileMenu: {
    minWidth: 265,
  },
  profileMenuUser: {
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  }
}));
