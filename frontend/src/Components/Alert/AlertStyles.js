import { makeStyles } from "@material-ui/core";


export default makeStyles((theme) => ({
  Alert: {
    position: "absolute",
    top: "5%",
    right: "3%",
    // width: "100%",
    animation: `$animateLoad 1s  ${ theme.transitions.easing.easeInOut } `,
    display: "flex",
    zIndex:10000
  },
  "@keyframes animateLoad": {
    "0%": {
      right: "1%",
      opacity: 0,
    },

    "100%": {
      opacity: 1,
    },
  },
}));

