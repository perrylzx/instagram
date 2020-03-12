import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "react-bootstrap/Button";
import firebase from "../firebase";
import "./Login.css";

var provider = new firebase.auth.GoogleAuthProvider();

const googleAuth = () => {
  firebase.auth().signInWithRedirect(provider);
};

class Login extends React.Component {
  render() {
    return (
      <div id="login-button-container">
        <div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              googleAuth();
            }}
          >
            Login Here
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
