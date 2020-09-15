import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//UI Components
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

//Custom Components
import CustomAlert from "../components/CustomAlert";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { register, selectAccount } from "../app/slides/accountSlide";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3, 6, 3),
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();

  //Redux
  const dispatch = useDispatch();
  const { error, loading, isError, isSuccess } = useSelector(selectAccount);

  //Register formData
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { email, username, password } = formData;

  const onRegisterFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onRegister(e);
  };

  const onRegister = () => {
    dispatch(register(formData));
  };

  return (
    <Container component="main" maxWidth="sm">
      {/* Loading, Success & Error handling */}
      {<CustomAlert loading={loading} />}

      {isError && (
        <CustomAlert openError={true} messageError={error}></CustomAlert>
      )}
      {isSuccess && <CustomAlert openSuccess={true}></CustomAlert>}

      <CssBaseline />
      <Paper className={classes.paper} elevation={4}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          value={email}
          autoFocus
          onChange={onRegisterFormChange}
          onKeyPress={keyPressed}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="User name"
          name="username"
          value={username}
          onChange={onRegisterFormChange}
          onKeyPress={keyPressed}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          value={password}
          type="password"
          id="password"
          onChange={onRegisterFormChange}
          onKeyPress={keyPressed}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onRegister}
        >
          Register
        </Button>
        <Grid container>
          <Grid item xs>
            {/* <Link href="#" variant="body2">
              Forgot password?
            </Link> */}
          </Grid>
          <Grid item>
            <Link to="/login" variant="body2">
              {"Already have an account? Login"}
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
