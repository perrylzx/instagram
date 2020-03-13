//TODO(Perry): Change syntax to es6
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({});
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// Create Cloud Function `createPost` takes the image url from the front end, which we then send to the firestore ref
exports.createPost = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(async user => {
        if (user) {
          let postsCollectionRef = db.collection("users/user/posts");
          let postDocRef = await postsCollectionRef.add({
            url: req.body.imageUrl
          });
          const postDocSnapshot = await postDocRef.get();
          res.send(postDocSnapshot.data().url);
        }
      });
  });
});
