const express = require("express");
const { getNonce, verifyNonce, editProfile, followUser, getUser, getAllUsers } = require("../controllers/AuthController");

const  router = express.Router();

router.route("/generate-nonce").get(getNonce)

router.route("/verify-nonce").post(verifyNonce)

router.route("/profile/:profileId/edit").put(editProfile)

router.route("/profile/:profileId/follow").post(followUser)

router.route("/users").get(getAllUsers)

router.route("/profile/:profileId").get(getUser)


module.exports = router