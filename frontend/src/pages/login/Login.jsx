import { Lock, Person } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import "./login.css";

export default function Login({ setLogin }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [flash, setFlash] = useState({
    severity: "info",
    message: "info",
  });
  const [showFlash, setShowFlash] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loginForm = new FormData();
    loginForm.append("username", username);
    loginForm.append("password", password);

    await axios
      .post("/users/login", loginForm, {})
      .then((user) => {
        setLogin(true);
      })
      .catch((err) => {
        console.log("error alındı alert gelecek");
        console.log(err.status, err.message);
        setFlash({
          severity: "error",
          message: "You entered wrong username or password.",
        });
        setShowFlash(true);
        setLogin(false);
        setTimeout(() => {
          setShowFlash(false);
        }, 5000);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowFlash(false);
  };

  return (
    <div className="containerLogin">
      <div className="contentCenter">
        <div className="card">
          <div className="cardHeader">
            <h3>LOGIN</h3>
          </div>
          <div className="cardBody">
            <Snackbar
              open={showFlash}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity={flash.severity}
                sx={{ width: "100%" }}
                variant="filled"
              >
                {flash.message}
              </Alert>
            </Snackbar>

            <form className="cardForm" onSubmit={handleSubmit}>
              <div className="formInputItem">
                <Person className="formInputIcon" />
                <input
                  type="text"
                  placeholder="username"
                  className="formInputText"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="formInputItem">
                <Lock className="formInputIcon" />
                <input
                  type="password"
                  placeholder="password"
                  className="formInputText"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="formSubmitBtn">
                <input type="submit" value="LOG IN" className="loginBtn" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setLogin: PropTypes.func.isRequired,
};
