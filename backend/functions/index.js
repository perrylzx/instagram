//TODO(Perry): Change syntax to es6
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// ref to the firestore where we want to store the image urls
let imageRef = db
  .collection("users")
  .doc("user")
  .collection("posts");

// Create Cloud Function `createPost` takes the image url from the front end, which we then send to the firestore ref
exports.createPost = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    let setTest = await imageRef.add({
      url: req.body.imageUrl
    });
    res.send("succesfully ran funcion");
  });
});

let postsRef = db.collection("users/user/posts");
// Create cloud function fetchPosts that fetchs the image url of all the posts
exports.fetchPosts = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    let allPosts = postsRef
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data().url;
          res.send(data);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  });
});

// let allPosts = postsRef
//   .get()
//   .then(snapshot => {
//     snapshot.forEach(doc => {
//       const data = doc.data().url;
//       console.log(data);
//     });
//   })
//   .catch(err => {
//     console.log("Error getting documents", err);
//   });
