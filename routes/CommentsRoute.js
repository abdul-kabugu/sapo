const express = require("express");
const { createComment, getPostComments } = require("../controllers/CommentsController");

const router = express.Router();

router.route("/create").post(createComment)

router.route("/:postId").get(getPostComments)


module.exports = router