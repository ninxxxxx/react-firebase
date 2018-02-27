import React, { Component } from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import UserProfile from "./UserProfile";
import {
  AppBar,
  Snackbar,
  RefreshIndicator
} from "material-ui/";
var firebase = require("firebase");
const config = {
  apiKey: "AIzaSyCf5vI8AprjBDGGhnvUgB7T6_FfeMQ2l_o",
  authDomain: "heroes-of-the-zygen.firebaseapp.com",
  databaseURL: "https://heroes-of-the-zygen.firebaseio.com",
  projectId: "heroes-of-the-zygen",
  storageBucket: "heroes-of-the-zygen.appspot.com",
  messagingSenderId: "621771334874"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      username: "",
      password: "",
      nums: [],
      isLoggedin: false,
      isSnackOpen: false,
      isFormLogin: true,
      snackMessage: "",
      user: null,
      loading: false
    };

    this.signupWithEmailAndPassword = this.signupWithEmailAndPassword.bind(
      this
    );
    this.signOut = this.signOut.bind(this);
    this.loginWithEmail = this.loginWithEmail.bind(this);

    this.loginWithGoogle = this.loginWithGoogle.bind(this);

    this.loginWithFacebook = this.loginWithFacebook.bind(this);

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentDidMount() {
    // let user = firebase.auth().currentUser;
    // this.setState({ isLoggedin: !!user });
  }

  componentWillUnmount() {}





  handleTextChange(event) {
    this.setState({ username: event.target.value });
  }

  toggleSnack(msgs) {
    msgs = msgs.length > 0 ? msgs : "This is snack!";
    this.setState({ isSnackOpen: true, snackMessage: msgs });
  }

  signupWithEmailAndPassword(email, password, username) {
    this.setState({loading: true});
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.setState({loading: false});
        console.log(res);
      })
      .catch(error=> {
        // Handle Errors here.
        this.setState({loading: false});
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  signOut() {
    //call firebase.auth().signOut for logout
    firebase
      .auth()
      .signOut()
      .then(res => {
        console.log(res);
        this.setState({ isLoggedin: false, user: null });
      })
      .catch(err => {
        console.log(err);
      });
  }


  loginWithEmail(email, password) {
    this.setState({loading: true});
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        // if (firebase.auth().onAuthStateChanged()) {
          var user = firebase.auth().currentUser;
          var uid = user.uid;
          fetch(
            "https://us-central1-heroes-of-the-zygen.cloudfunctions.net/userInfo",
            {
              method: "POST",
              mode: "CORS",
              body: JSON.stringify({ uid: uid }),
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
            .then(res => {
              return res.json();
            })
            .then(res => {
              console.log(res);
              this.setState({loading: false});
              this.setState({ isLoggedin: true, user: res.user });
            })
            .catch(err => {
              console.log(err);
            });
      })
      .catch(err => {
        this.toggleSnack(err.message);
        console.log("error", err);
      });
  }

  loginWithGoogle(e) {
    e.preventDefault();
    this.setState({loading: true});
    let googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(result => {
        var token = result.credential.accessToken;
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        fetch(
          "https://us-central1-heroes-of-the-zygen.cloudfunctions.net/userInfo",
          {
            method: "POST",
            mode: "CORS",
            body: JSON.stringify({ uid: uid }),
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
          .then(res => {
            return res.json();
          })
          .then(res => {
            console.log(res);
            this.setState({loading: false});
            this.setState({ isLoggedin: true, user: res.user });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error=> {
        this.setState({loading: false});
        console.log("fail", error);

        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }

  loginWithFacebook(e) {
    e.preventDefault();
    this.setState({loading: true});
    let facebookProvider = new firebase.auth.FacebookAuthProvider();
    
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then(res => {
        console.log(res);
        // var token = res.credential.accessToken;
        // var user = res.user;
        // this.setState({ isLoggedin: true, user: res.user });
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        fetch(
          "https://us-central1-heroes-of-the-zygen.cloudfunctions.net/userInfo",
          {
            method: "POST",
            mode: "CORS",
            body: JSON.stringify({ uid: uid }),
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
          .then(res => {
            return res.json();
          })
          .then(res => {
            console.log(res);
            this.setState({loading: false});
            this.setState({ isLoggedin: true, user: res.user });
          })
          .catch(err => {
            this.setState({loading: false});
            console.log(err);
          });
      })
      .catch(error=> {
        this.setState({loading: false});
        console.log("fail", error);
      })
      .catch(error=> {
        console.log(error);
        // Handle Errors here.
        this.setState({loading: false});
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }


  test(e){
    const token = ""

    e.preventDefault()
    fetch(
      "https://us-central1-heroes-of-the-zygen.cloudfunctions.net/checkToken",
      {
        method: "POST",
        mode: "CORS",
        body: JSON.stringify({ token: token }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        this.setState({loading: false});
        this.setState({ isLoggedin: true, user: res.user });
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    return (
      <div>
        <AppBar title="Profile" />
        <div className="container">
          {!this.state.isLoggedin ? (
            <div className="papar-group">
              <Login
                handleLoginWithEmail={this.loginWithEmail}
                handleLoginWithGoogle={this.loginWithGoogle}
                handleLoginWithFacebook={this.loginWithFacebook}
              />
              <Signup handleSignUp={this.signupWithEmailAndPassword}/>
            </div>
          ) : (
            <UserProfile user={this.state.user} handleSignOut={this.signOut} />
          )}

          {this.state.loading ? <div className="loading-container">
            <RefreshIndicator
              size={40}
              left={10}
              top={0}
              status="loading"
              className="loading"
            />
          </div> : null}

          <Snackbar
            open={this.state.isSnackOpen}
            message={this.state.snackMessage}
            autoHideDuration={3000}
            onRequestClose={() => this.setState({ isSnackOpen: false })}
          />
        </div>
      </div>
    );
  }
}

export default App;