import React from "react";
import firebase from "../firebase";
import "./PostList.css";
const db = firebase.firestore();

// This component fetches the urls from the fetchPosts cloud functions, then sets it to the state, on component mount
export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageUrls: [] };
  }

  componentDidMount() {
    let postsRef = db.collection("users/user/posts");
    postsRef.onSnapshot(QuerySnapshot => {
      const urlList = [];
      QuerySnapshot.forEach(doc => {
        urlList.push(doc.data().url);
      });
      this.setState({ imageUrls: urlList });
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
