import React, { Component } from "react";
import {
  Paper,
  TextField,
} from "material-ui/";
import { FlatButton, RaisedButton } from "material-ui/";

class Login extends Component {
  constructor(prop) {
    super(prop);
  }

  render() {
    return (
      <Paper className="login-paper">
        <h1 className="header-title">Login</h1>
        <TextField
          hintText="please enter email"
          floatingLabelText="E-mail"
          className="textField"
          type="email"
          onChange={e => {
            this.setState({ username: e.target.value });
          }}
        />
        <TextField
          hintText="please enter password"
          floatingLabelText="Password"
          className="textField"
          type="password"
          onChange={e => {
            this.setState({ password: e.target.value });
          }}
        />
        <FlatButton
          primary={true}
          label="login"
          className="button"
          fullWidth={true}
          onClick={() =>
            this.props.handleLoginWithEmail(
              this.state.username,
              this.state.password
            )
          }
        />
        <div className="login-button-group">
          {/* {this.state.isLoggedin ? (
                  <RaisedButton
                    secondary={true}
                    label="logout"
                    className="button"
                  />
                ) : null} */}
        </div>
        <RaisedButton
          type="submit"
          fullWidth={true}
          label="login with facebook"
          className="other-login-btn"
          onClick={this.props.handleLoginWithFacebook}
        />
        <RaisedButton
          fullWidth={true}
          label="login with google"
          className="other-login-btn"
          onClick={this.props.handleLoginWithGoogle}
        />
      </Paper>
    );
  }
}

export default Login;
