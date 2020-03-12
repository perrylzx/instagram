const projectConfig = {
  databaseURL: "https://instagram-testing-b8932.firebaseio.com",
  storageBucket: "instagram-testing-b8932.appspot.com",
  projectId: "instagram-testing-b8932"
};
const test = require("firebase-functions-test")(
  projectConfig,
  "./test/serviceAccountKey.json"
);

const chai = require("chai");
const assert = chai.assert;
const sinon = require("sinon");
const admin = require("firebase-admin");

describe("Cloud Functions", () => {
  let myFunctions;

  before(() => {
    myFunctions = require("../index");
  });

  after(() => {
    test.cleanup();
  });

  describe("createPost", () => {
    it('should return a "succesfully sent image url" message', done => {
      // constructing test data
      const req = {
        headers: {},
        body: { imageUrl: "www.creedthoughts.gov.www/creedthoughts" }
      };
      // fake response object with stubbed send function which asserts that it sends back 'successfuly ran function'
      const res = {
        setHeader: sinon.stub(),
        send: message => {
          assert.equal(message, "www.creedthoughts.gov.www/creedthoughts");
          done();
        }
      };
      myFunctions.createPost(req, res);
    });
  });
});
