import React from "react";

// This sends your photo to a test api that i made to experiment with input file and form sending req
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
