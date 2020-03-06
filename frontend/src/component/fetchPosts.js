import React from "react";
import "./FetchPosts.css";

// This component fetches the urls from the fetchPosts cloud functions, then sets it to the state, on component mount
class FetchPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageUrl: [] };
  }

  componentDidMount() {
    fetch(
      "https://us-central1-kittengram-9e684.cloudfunctions.net/fetchPosts",
      {
        method: "GET"
      }
    )
      .then(response => {
        return response.json();
      })
      .then(urlList => {
        this.setState({ imageUrl: urlList });
      });
  }

  // Currently, this just renders the first two images from the database
  // TODO(Perry): Render ALL the images from the database
  render() {
    return (
      <div className="posts-container">
        <img src={this.state.imageUrl[0]} alt="cat"></img>
        <img src={this.state.imageUrl[1]} alt="cat"></img>
      </div>
    );
  }
}

export default FetchPosts;
