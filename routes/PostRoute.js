const express = require("express");
const { createNewPost, getAllPosts, likePost, getPost, editPost } = require("../controllers/PostController");


const  router  = express.Router();

router.route("/create").post(createNewPost)

router.route("/get-posts").get(getAllPosts)

router.route("/:postId/like").post(likePost)

router.route("/:postId").get(getPost)

router.route("/:postId/edit").put(editPost)

//router.route("/profile/:profileId/follow").post()



module.exports =  router