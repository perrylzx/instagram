import React from "react";
import firebase from "../firebase";

// TODO(Perry): Make this component look fancy
const SubmitPic = () => {
  const storage = firebase.storage();
  const storageRefRoot = storage.ref();
  const imageRef = storageRefRoot.child("images");
  return (
    <form>
      <input
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
            );
          });
        }}
      ></input>

      <div>
        <label>Upload Photo</label>
      </div>

      <br />
    </form>
  );
};

export default SubmitPic;
