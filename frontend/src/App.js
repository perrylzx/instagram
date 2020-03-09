import React from "react";
import Login from "./component/Login";
import FetchPosts from "./component/PostList";
import SubmitPic from "./component/SubmitPic";

function App() {
  return (
    <div>
      <Login />
      <SubmitPic />
      <FetchPosts />
    </div>
  );
}

export default App;
