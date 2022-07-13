import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import MUIAlert from "@material-ui/lab/Alert";
import useStyles from "./AlertStyles";

function ActionAlerts({ severity, message }) {
  const classes = useStyles();
  const [display, setDisplay] = useState({
    isDisplayed: true,
    display: { display: "flex" },
  });
  const handleDisplay = () => {
    setDisplay({ isDisplayed: false, display: { display: "none" } });
  };
  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     handleDisplay();
  //   }, 2000);
  //   return () => clearTimeout(identifier);
  // });
  return (
    <MUIAlert
      onClose={handleDisplay}
      style={display.display}
      severity={severity}
      className={classes.Alert}
    >
      {message}
    </MUIAlert>
  );
}

const Alert = ({ severity, message }) => {
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);
  //  createPortal(<LoaderComponent />, document.getElementById("loader"));

  return domReady ? (
    createPortal(
      <ActionAlerts severity={severity} message={message} />,
      document.getElementById("alert")
    )
  ) : (
    <></>
  );
};
export default Alert;
