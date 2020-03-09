//TODO(Perry): Change syntax to es6
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// ref to the firestore where we want to store the image urls
let imageRef = db.collection("users/user/posts");

// Create Cloud Function `createPost` takes the image url from the front end, which we then send to the firestore ref
exports.createPost = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    let setTest = await imageRef.add({
      url: req.body.imageUrl
    });
    res.send("succesfully ran funcion");
  });
});

// This function fetches all the image urls from the database and then sends it back in an array
let postsRef = db.collection("users/user/posts");
exports.fetchPosts = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    const idToken = req.headers.authorization;
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        let uid = decodedToken.uid;
        console.log(uid);
      });
    let allPosts = postsRef
      .get()
      .then(snapshot => {
        const urlList = [];
        snapshot.forEach(doc => {
          urlList.push(doc.data().url);
        });
        res.send(urlList);
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  });
});
