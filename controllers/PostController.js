const  asyncHandler =  require("express-async-handler")
const Post = require("../models/PostModel")
const { constants } = require("../constants")
const { updateUserXP, incrementXPForCreatorOnVideoLiked, incrementXPForLikingVideo, incrementXPForCommenting } = require("../utility/points")
const Comment = require("../models/CommentModel")


 const createNewPost =   asyncHandler(async (req, res)  =>  {

    const {author, content, media, tags, appId, category, title, thumbnail  } = req.body

    if(! author || ! content){
        res.status(constants.VALIDATION_ERROR).json({message : "Fill all informtion"})
}

  const newPost =  new Post({
    author ,
    content,
    media,
    tags,
    appId,
    category,
   title,
   thumbnail 
  })

  await newPost.save()

  res.status(201).json({message : "new post created"})
 })

  const  getAllPosts = asyncHandler(async (req, res)  =>  {
    const posts = await Post.find()

    res.status(200).send(posts)
  }
  )

   const likePost = asyncHandler( async (req, res)  =>  {

    const {userId} = req.body

    const {postId} = req.params


    
    const  post =  await Post.findById(postId)



    if(! post){
       return res.status(constants.VALIDATION_ERROR).json({message : "video not found"})
    }

    // check if user  have  liked  posts

     if(post.likes.includes(userId)){
  return  res.status(400).json({message : "user  have liked"})
     }

       const  creatorId =  post.author

       //  reward post creator
   incrementXPForCreatorOnVideoLiked(creatorId)

   // reward liker

   incrementXPForLikingVideo(userId)

     post.likes.push(userId)

     await post.save()

     res.status(200).send("post liked")
    
   })

    const getPost = asyncHandler(async (req, res)  => {

      const {postId} = req.params

      const post = await Post.findById(postId)

      res.status(200).send(post)

    })

    const editPost = asyncHandler(async (req, res)  => {

      const {postId} = req.params

        const {content, media}  = req.body

      const post = await Post.findByIdAndUpdate(postId, {
        content,
        media
      })

      if(! post){
        return res.status(constants.VALIDATION_ERROR).json({message : "no post found"})
      }

      

      res.sendStatus(201).send("post edited")

    })


    //  create  comment

     const createComment = asyncHandler (async (req, res)  =>  {

     const {postId} = req.params
     const {content, userId} = req.body

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

         incrementXPForCommenting()

         res.status(201).send("comment created")

     })

     const isPostLiked = asyncHandler(async (req, res)  =>  {
        const {postId, userId}  =  req.params

        const post = await Post.findById(postId);

        if(! post)  {
          return res.status(constants.NOT_FOUND).send("no post foound")
        }

        const isLiked = post.likes.includes(userId);

        res.status(200).json({isLiked})
        
     })


     // Get total likes for a post
const getPostLikes = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId).populate('likes', 'address avatar name');

  if (post) {
      res.json({ totalLikes: post.likes.length, likes: post.likes });
  } else {
      res.status(404);
      throw new Error('Post not found');
  }
})


 module.exports = {createNewPost, getAllPosts, likePost, getPost, editPost, createComment, isPostLiked, getPostLikes}