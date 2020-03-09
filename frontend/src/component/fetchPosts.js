import React from "react";
import "./FetchPosts.css";

// This component fetches the urls from the fetchPosts cloud functions, then sets it to the state, on component mount
class FetchPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageUrls: [] };
  }

  async componentDidMount() {
    await fetch(
      "http://localhost:5001/kittengram-9e684/us-central1/fetchPosts",
      {
        method: "GET"
      }
    )
      .then(response => {
        return response.json();
      })
      .then(urlList => {
        this.setState({ imageUrls: urlList });
      });

  render() {
    const postComponents = [];
    this.state.imageUrls.forEach(imageUrl => {
      postComponents.push(
        <div id="posts">
          <img src={imageUrl} alt="cat" />
        </div>
      );
    });

    return <div className="posts-container">{postComponents}</div>;
  }
}
export default FetchPosts;
