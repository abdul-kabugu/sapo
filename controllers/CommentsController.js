const  asyncHandler =  require("express-async-handler")
const Post = require("../models/PostModel")
const { constants } = require("../constants")
const { updateUserXP, incrementXPForCreatorOnVideoLiked, incrementXPForLikingVideo, incrementXPForCommenting } = require("../utility/points")
const Comment = require("../models/CommentModel")


  //  create  comment

  const createComment = asyncHandler (async (req, res)  =>  {

    const {content, userId, postId} = req.body

      if(! postId || ! content){
       return res.status(constants.VALIDATION_ERROR).json({message : "add all information"})
      }

      const newComment = new Comment({
       author : userId,
       content,
       postId
      })

     await  newComment.save()

        // reward comment creator 

        incrementXPForCommenting(userId)

        res.status(201).send("comment created")

    })


     const getPostComments =  asyncHandler( async (req, res)  => {

           const {postId} = req.params

           const comments = await Comment.find({ postId })
           .populate('author', 'address name avatar')
           .exec();

       if (comments.length === 0) {
           return res.status(404).json({ message: 'No comments found for this post' });
       }

       res.status(200).send(comments );

     })

    module.exports = {createComment, getPostComments}