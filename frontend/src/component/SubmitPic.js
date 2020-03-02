import React from "react";
import firebase from '../firebase'


const SubmitPic = () => (
  <form action="http://localhost:4000/submit-photo" method="get">
    <div>
      <label for="pic">Upload Photo</label>
    </div>
    <br />
    <div>
      <input type="file" accept="image/*" id="pic"></input>
    </div>
    <br />
  </form>
);

export default SubmitPic;
