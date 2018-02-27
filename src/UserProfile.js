import React, { Component } from "react";
import { Paper, FlatButton } from "material-ui";
class UserProfile extends Component {
  constructor(prop) {
    super(prop);
  }

  render() {
    const user = this.props.user;
    return user ? (
      <div className="user-profile">
        <Paper className="user-info" zDepth={1}>
          <img className="user-img" src={user.photoURL} />
          <h2>{user.displayName}</h2>
          <h3>{user.email}</h3>
          <h3>{user.rewardPoint} points</h3>
          <FlatButton label="sign out" onClick={this.props.handleSignOut}/>
        </Paper>
      </div>
    ) : null;
  }
}

export default UserProfile;
