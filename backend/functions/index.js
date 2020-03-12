//TODO(Perry): Change syntax to es6
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({});
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// Create Cloud Function `createPost` takes the image url from the front end, which we then send to the firestore ref
exports.createPost = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    // ref to the firestore where we want to store the image urls
    let postsCollectionRef = db.collection("users/user/posts");
    let postDocRef = await postsCollectionRef.add({
      url: req.body.imageUrl
    });
    const postDocSnapshot = await postDocRef.get();
    console.log(postDocSnapshot.data());
    res.send(postDocSnapshot.data().url);
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
      .then(user => {
        if (user) {
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
        }
      });
  });
});

// let postsRef = db.collection("users/user/posts");
// exports.fetchPosts = functions.https.onRequest((req, res) => {
//   return cors(req, res, () => {
//     const idToken = req.headers.authorization;
//     admin
//       .auth()
//       .verifyIdToken(idToken)
//       .then(user => {
//         if (user) {
//           let allPosts = postsRef.onSnapshot(querySnapshot => {
//             const urlList = [];
//             querySnapshot.forEach(doc => {
//               urlList.push(doc.data().url);
//             });
//             res.send(urlList);
//           });
//         }
//       });
//   });
// });
