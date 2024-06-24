const  asyncHandler =  require("express-async-handler")
const Token = require("../models/TokenModel")
const { constants } = require("../constants")



  const saveToken = asyncHandler(async (req, res)  =>  {

     const {creator, name, symbol, totalSupply, initalPrice, tokenAddress}  = req.body

     if(! creator || ! name || !symbol){
        return res.status(constants.VALIDATION_ERROR).json({message : "fill all fields"})
     }

     const newToken  = new Token({
       creator,
       name,
       symbol,
        totalSupply,
        initalPrice,
        tokenAddress
     })

     await newToken.save()

     res.status(201).json({message : "token created succefully"})
  })

  const getAllTokens = asyncHandler( async(req, res)  =>  {

     const tokens = await Token.find()

     
     if (tokens.length === 0) {
        return res.status(404).json({ message: 'No token  found for this platform' });
    }

    res.status(200).send(tokens)
  })

  // Get social tokens for a specific user (creator)
const getUserTokens = asyncHandler(async (req, res) => {
   const { userId} = req.params;
   const tokens = await Token.find({creator : userId }).populate('creatorId', 'address name avatar');

   if (tokens) {
       res.json(tokens);
   } else {
       res.status(404);
       throw new Error('Tokens not found for this user');
   }
});


  module.exports =  {getAllTokens, saveToken, getUserTokens}