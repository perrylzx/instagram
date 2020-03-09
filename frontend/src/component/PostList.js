import React from "react";
import firebase from "../firebase";
import "./PostList.css";

// This component fetches the urls from the fetchPosts cloud functions, then sets it to the state, on component mount
export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageUrls: [] };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const idToken = await user.getIdToken(true);
        fetch("http://localhost:5001/kittengram-9e684/us-central1/fetchPosts", {
          method: "GET",
          headers: {
            Authorization: idToken
          }
        })
          .then(response => {
            return response.json();
          })
          .then(urlList => {
            this.setState({ imageUrls: urlList });
          });
        //  make login button disappear after logged in
      }
    });
  }

  render() {
    const postComponents = [];
    this.state.imageUrls.forEach(imageUrl => {
      postComponents.push(
        <div key={imageUrl}>
          <img src={imageUrl} alt="cat" />
        </div>
      );
    });
    return <div className="posts-container">{postComponents}</div>;
  }
}
