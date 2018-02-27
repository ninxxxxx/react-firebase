import React, { Component } from "react";
import { TextField, Paper, FlatButton } from "material-ui";
class Signup extends Component {
  constructor(prop) {
    super(prop);
  }

  render() {
    return (
      <Paper className="signup-paper">
        <h1 className="header-title">Sign up</h1>
        <TextField
          hintText="please enter email"
          floatingLabelText="E-mail"
          className="textField"
          fullWidth={true}
          onChange={(e)=>this.setState({email: e.target.value})}
        />
        <TextField
          hintText="please enter password"
          floatingLabelText="Password"
          className="textField"
          type="password"
          fullWidth={true}
          onChange={(e)=>this.setState({password: e.target.value})}
        />
        <TextField
          hintText="please enter username"
          floatingLabelText="Username"
          className="textField"
          fullWidth={true}
          onChange={(e)=>this.setState({username: e.target.value})}
        />
        <div className="signup-button-group">
          <FlatButton
            label="sign up"
            primary={true}
            onClick={() =>
              this.props.handleSignUp(
                this.state.email, 
                this.state.password,
                this.state.username)
            }
          />
        </div>
      </Paper>
    );
  }
}

export default Signup;
