import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import firebase from "../firebase";
import "./SubmitPic.css";

// TODO(Perry): Make this component look fancy with bootstrap
class SubmitPic extends React.Component {
  // TODO(Perry): update this component to do user verification
  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
      }
    });
  }

  render() {
    const storage = firebase.storage();
    const storageRefRoot = storage.ref();
    const imageRef = storageRefRoot.child("images");
    return (
      <div className="upload-container">
        <div>
          <h1 className="upload-text">Instagram</h1>
        </div>
        <br />
        <div>
          <form>
            <input
              className="upload-text"
              type="file"
              onChange={e => {
                const file = e.target.files[0];
                const storageRef = imageRef.child(file.name);
                storageRef.put(file).then(async snapshot => {
                  const imageUrl = await snapshot.ref.getDownloadURL();
                  console.log(`Uploaded ${file.name}`, "at", imageUrl);
                  fetch(
                    "https://us-central1-kittengram-9e684.cloudfunctions.net/createPost",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({ imageUrl })
                    }
                  ).then(res => {
                    console.log(res);
                  });
                });
              }}
            ></input>
            <br />
          </form>
        </div>
      </div>
    );
  }
}

export default SubmitPic;
