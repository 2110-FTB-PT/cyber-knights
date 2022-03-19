const axios = require("axios");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SERVER_ADDRESS = "http://localhost:", PORT = 4000 } = process.env;
const DATABASE_URL = process.env.DATABASE_URL || SERVER_ADDRESS + PORT;
const {
  JWT_SECRET = "d4eda3393d7e3916bdd46d2cfa41f63949b634c9c395b02d53e84636cf57d12dc80992cdb3169d8be5d623465221365a627204c5b9b978660a43c7ee6488cbd1",
} = process.env;

const { rebuildDB } = require("../db/seedData");
const {
  getUserById,
  getPublicCommentsByUser,
  getPublicReviewsByUser,
} = require("../db");
const client = require("../db/client");

describe("API", () => {
  let token, registeredUser;

  beforeAll(async () => {
    await rebuildDB();
  });
  afterAll(async () => {
    await client.end();
  });
  it("responds to a request at /api/health with a message specifying it is healthy", async () => {
    const res = await axios.get(`${DATABASE_URL}/api/health`);

    expect(typeof res.data.message).toEqual("string");
  });

  describe("Users", () => {
    let newUser = { username: "peterparker", password: "spiderman" };
    let newUserShortPassword = { username: "peterShort", password: "sm" };
    describe("POST /users/register", () => {
      let tooShortSuccess, tooShortResponse;
      beforeAll(async () => {
        const successResponse = await axios.post(
          `${DATABASE_URL}/api/users/register`,
          newUser
        );
        registeredUser = successResponse.data.user;
        try {
          tooShortSuccess = await axios.post(
            `${DATABASE_URL}/api/users/register`,
            newUserShortPassword
          );
        } catch (err) {
          tooShortResponse = err.response;
        }
      });
      it("Creates a new user.", () => {
        expect(typeof registeredUser).toEqual("object");
        expect(registeredUser.username).toEqual(newUser.username);
      });
      it("Requires username and password. Requires all passwords to be at least 8 characters long.", () => {
        expect(newUser.password.length).toBeGreaterThan(7);
      });
      it("Hashes password before saving user to DB.", async () => {
        const {
          rows: [queriedUser],
        } = await client.query(
          `
          SELECT *
          FROM users
          WHERE id = $1;
        `,
          [registeredUser.id]
        );
        expect(queriedUser.password).not.toBe(newUser.password);
        expect(
          await bcrypt.compare(newUser.password, queriedUser.password)
        ).toBe(true);
      });
      it("Throws errors for duplicate username", async () => {
        let duplicateSuccess, duplicateErrResp;
        try {
          duplicateSuccess = await axios.post(
            `${DATABASE_URL}/api/users/register`,
            newUser
          );
        } catch (err) {
          duplicateErrResp = err.response;
        }
        expect(duplicateSuccess).toBeFalsy();
        expect(duplicateErrResp.data).toBeTruthy();
      });
      it("Throws errors for password tooshort.", async () => {
        expect(tooShortSuccess).toBeFalsy();
        expect(tooShortResponse.data).toBeTruthy();
      });
    });
    describe("POST /users/login", () => {
      it("Logs in the user. Requires username and password, and verifies that hashed login password matches the saved hashed password.", async () => {
        const { data } = await axios.post(
          `${DATABASE_URL}/api/users/login`,
          newUser
        );
        token = data.token;
        expect(data.token).toBeTruthy();
      });
      it("Returns a JSON Web Token. Stores the id and username in the token.", async () => {
        const parsedToken = jwt.verify(token, JWT_SECRET);
        expect(parsedToken.id).toEqual(registeredUser.id);
        expect(parsedToken.username).toEqual(registeredUser.username);
      });
    });
    describe("GET /users/me", () => {
      it("sends back users data if valid token is supplied in header", async () => {
        const { data } = await axios.get(`${DATABASE_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        expect(data.username).toBeTruthy();
        expect(data.username).toBe(registeredUser.username);
      });
      it("rejects requests with no valid token", async () => {
        let noTokenResp, noTokenErrResp;
        try {
          noTokenResp = await axios.get(`${DATABASE_URL}/api/users/me`);
        } catch (err) {
          noTokenErrResp = err.response;
        }
        expect(noTokenResp).toBeFalsy();
        expect(noTokenErrResp.data).toBeTruthy();
      });
    });
    describe("GET /users/:username/comments", () => {
      it("Gets a list of public comments for a particular user.", async () => {
        const userId = 2;
        const userWithComments = await getUserById(userId);
        const { data: comments } = await axios.get(
          `${DATABASE_URL}/api/users/${userWithComments.username}/comments`
        );
        const commentsFromDB = await getPublicCommentsByUser(userWithComments);
        expect(comments).toBeTruthy();
        expect(comments).toEqual(commentsFromDB);
      });
    });
    describe("GET /users/:id/reviews", () => {
      it("Gets a list of public reviews for a particular user.", async () => {
        const userId = 2;
        const { data: reviews } = await axios.get(
          `${DATABASE_URL}/api/users/${userId}/reviews`
        );
        const reviewsFromDB = await getPublicReviewsByUser(userId);
        expect(reviews).toBeTruthy();
        expect(reviews).toEqual(reviewsFromDB);
      });
    });
  });
  describe("Comments", () => {
    let commentToCreateAndUpdate = {
      comment: "WOW I want one now",
    };
    describe("POST /comments/create (*)", () => {
      it("Logged in users can create a new comment", async () => {
        const { data: respondedComment } = await axios.post(
          `${DATABASE_URL}/api/comments`,
          commentToCreateAndUpdate,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        expect(respondedComment.comment).toEqual(
          commentToCreateAndUpdate.comment
        );
        commentToCreateAndUpdate = respondedComment;
      });
      it("Requires logged in user", async () => {
        let noLoggedInUserResp, noLoggedInUserErrResp;
        try {
          noLoggedInUserResp = await axios.post(
            `${DATABASE_URL}/api/comments`,
            commentToFail
          );
        } catch (err) {
          noLoggedInUserErrResp = err.response;
        }
        expect(noLoggedInUserResp).toBeFalsy();
        expect(noLoggedInUserErrResp.data).toBeTruthy();
      });
    });
    describe("PATCH /comments/:commentId (*)", () => {
      it("Logged in users can update or delete their comments", async () => {
        const { data: respondedComment } = await axios.patch(
          `${API_URL}/api/comments/${commentToCreateAndUpdate.id}`,
          newCommentData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        expect(respondedComment.comment).toEqual(respondedComment.comment);
        commentToCreateAndUpdate = respondedComment;
      });
    });
  });
  describe("Reviews", () => {
    let reviewToCreateAndUpdate = {
      title: "WOW SO CUTE",
      description: "This is the cutest pet rock ever!!!",
    };
    describe("POST /reviews/create (*)", () => {
      it("Logged in users can create a new review", async () => {
        const { data: respondedReview } = await axios.post(
          `${DATABASE_URL}/api/reviews`,
          reviewToCreateAndUpdate,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        expect(respondedReview.title).toEqual(reviewToCreateAndUpdate.title);
        expect(respondedReview.description).toEqual(
          reviewToCreateAndUpdate.description
        );
        reviewToCreateAndUpdate = respondedReview;
      });
      it("Requires logged in user", async () => {
        let noLoggedInUserResp, noLoggedInUserErrResp;
        try {
          noLoggedInUserResp = await axios.post(
            `${DATABASE_URL}/api/reviews`,
            reviewToFail
          );
        } catch (err) {
          noLoggedInUserErrResp = err.response;
        }
        expect(noLoggedInUserResp).toBeFalsy();
        expect(noLoggedInUserErrResp.data).toBeTruthy();
      });
    });
    describe("PATCH /reviews/:reviewId (*)", () => {
      it("Logged in users can update or delete their reviews", async () => {
        const { data: respondedReview } = await axios.patch(
          `${API_URL}/api/reviews/${reviewToCreateAndUpdate.id}`,
          newReviewData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        expect(respondedReview.title).toEqual(reviewToCreateAndUpdate.title);
        expect(respondedReview.description).toEqual(
          reviewToCreateAndUpdate.description
        );
        reviewToCreateAndUpdate = respondedReview;
      });
    });
  });
  // describe("Products", () => {});
});
