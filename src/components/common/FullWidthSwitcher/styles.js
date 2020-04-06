import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  switcher: {
    color: 'white',
    width: 20,
    height: 20,
    border: '1px solid #444',
    borderRadius: 20,
    background: '#222',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(50%,-50%)',
    zIndex: 1202
  },
  showSwitcher: {
    width: 20,
    height: 20,
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(50%,-50%)',
    zIndex: 1202
  }
}));