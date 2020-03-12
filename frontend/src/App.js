import React from "react";
import Login from "./component/Login";
import FetchPosts from "./component/PostList";
import SubmitPic from "./component/SubmitPic";
import firebase from "./firebase";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    const homepage = firebase.auth().currentUser ? (
      <div>
        <Login />
        <SubmitPic />
        <FetchPosts />
      </div>
    ) : (
      <div>
        <Login />
        <FetchPosts />
      </div>
    );
    return homepage;
  }
}

export default App;
