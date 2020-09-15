import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

//UI Components
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

//Custom
import { history } from "../App";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomAlert(props) {
  const classes = useStyles();

  //*Handle Success
  const [openSuccess, setOpenSuccess] = React.useState(
    props.openSuccess || false
  );

  const [messageSuccess, setMessageSuccess] = React.useState("");

  useEffect(() => {
    if (openSuccess)
      switch (history.location.state) {
        case 200:
          setMessageSuccess("Load successful!");
          break;
        case 201:
          setMessageSuccess("Add successful!");
          break;
        case 202:
          setMessageSuccess("Update successful!");
          break;
        case 203:
          setMessageSuccess("Delete successful!");
          break;
        default:
          break;
      }
  }, [openSuccess]);

  //*Handle Error
  const [openError, setOpenError] = React.useState(props.openError || false);
  const messageError = props.messageError ? props.messageError : undefined;
  let errorArray = [];

  if (messageError)
    for (const property in messageError) {
      errorArray.push(`${property}: ${messageError[property]}`);
    }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  };

  //*Hanlde Authority
  // const [openErrorAuthority, setOpenErrorAuthority] = React.useState(
  //   props.openErrorAuthority || false
  // );
  const openErrorAuthority = props.openErrorAuthority || false;

  return (
    <div className={classes.root}>
      {/* Loading */}
      {props.loading ? <LinearProgress color="secondary" /> : null}

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="success"
        >
          {messageSuccess}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          {messageError &&
            errorArray.map((error, index) => (
              <Typography key={index}>{`${error}\n`}</Typography>
            ))}
        </Alert>
      </Snackbar>

      {/* Error Authority */}
      <Collapse in={openErrorAuthority}>
        <Alert severity="error" variant="filled">
          Your access is denied! No Authority
        </Alert>
      </Collapse>
    </div>
  );
}
