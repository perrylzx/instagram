// import functions from "firebase-functions";
// import admin from "firebase-admin";
// admin.initializeApp();

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original

//TODO(PERRY): read these in detail
exports.addMessage = functions.https.onRequest(async (req, res) => {
  const original = req.query.text;
  const snapshot = await admin
    .database()
    .ref("/messages")
    .push({ original: original });
  res.redirect(303, snapshot.ref.toString());
});

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
  .onCreate((snapshot, context) => {
    const original = snapshot.val();
    console.log('Uppercasing', context.params.pushId, original);
    const uppercase = original.toUpperCase();
    return snapshot.ref.parent.child('upper').set(uppercase);
  })