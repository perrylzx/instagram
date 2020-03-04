//TODO(Perry): Change syntax to es6
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

let imageRef = db
  .collection("users")
  .doc("user")
  .collection("posts");
// TODO(Perry): rename this function to createpost
// Create Cloud Function `createPost` takes the image url from the front end, which we then send to firestore
exports.createPost = functions.https.onRequest((req, res) => {
  // unable to hit endpoint without this line of code
  // example taken from https://stackoverflow.com/questions/42755131/enabling-cors-in-cloud-functions-for-firebase
  return cors(req, res, async () => {
    let setTest = await imageRef.add({
      url: req.body.imageUrl
    });
  });
});

// example taken from https://cloud.google.com/functions/docs/writing/http
exports.corsEnabledFunction = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  } else {
    res.send("Hello World!");
  }
};

// Cloud storage tutorial section:
// Creating a ref to collection and document we want to send the data to:
// let docRef = db.collection("users").doc("alovelace");

// Sending this data to the ref 'alovelace' we set above
// let setAda = docRef.set({
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815
// });

// Creating a ref to collection and document we want to send the data to:
// let aTuringRef = db.collection("users").doc("aturing");

//Sending this data to the ref 'aturing' we set above
// let setAlan = aTuringRef.set({
//   first: "Alan",
//   middle: "Mathison",
//   last: "Turing",
//   born: 1912
// });

// let setLimRef = db.collection("users").doc("plim");

//Sending this data to the ref 'aturing' we set above
// let setPerry = setLimRef.set({
//   first: "Perry",
//   last: "Lim",
//   born: 1998
// });

// using 'get' method to retrieve the entire collection

// db.collection("users")
//   .get()
//   .then(snapshot => {
//     snapshot.forEach(doc => {
//       console.log(doc.id, "=>", doc.data());
//     });
//   })
//   .catch(err => {
//     console.log("Error getting documents", err);
//   });
