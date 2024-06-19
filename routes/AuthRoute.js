const express = require("express");
const { getNonce, verifyNonce, editProfile, followUser, getUser, getAllUsers, isFollowed, getUserFollowers, getUserFollowing } = require("../controllers/AuthController");

const  router = express.Router();

router.route("/generate-nonce").get(getNonce)

router.route("/verify-nonce").post(verifyNonce)

router.route("/profile/:profileId/edit").put(editProfile)

router.route("/profile/:profileId/follow").post(followUser)

router.route("/users").get(getAllUsers)

router.route("/profile/:profileId").get(getUser)

router.route("/relations/:followerId/:followedId").get(isFollowed)

router.route("/profile/followers/:userId").get(getUserFollowers)

router.route("/profile/following/:userId").get(getUserFollowing)

module.exports = router