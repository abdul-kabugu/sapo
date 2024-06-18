const asyncHanlder = require("express-async-handler")
const crypto  =  require("crypto")
const { ethers } = require('ethers');
const jwt =  require("jsonwebtoken");
const { constants, secretKey } = require("../constants");
const  User = require("../models/UserModel");
const { incrementXPForFollowingUser } = require("../utility/points");


const  getNonce = asyncHanlder(async (req, res)  =>  {
   const nonce  = crypto.randomBytes(32).toString("hex")
  res.status(200).json({nonce : nonce})
     
})

 const verifyNonce  =  asyncHanlder(async (req, res) =>  {
 const {signedMessage, address, message}  = req.body
const recoveredAddress = ethers.verifyMessage(message, signedMessage)

if(recoveredAddress !== address){
    res.status(constants.VALIDATION_ERROR).json({message : "invalid signature"})
}

const isAvailable = await User.findOne({address})
 
if(! isAvailable){
    const user = new User({address : address})
    await user.save()
}

 const token =  jwt.sign({id : address},  secretKey, {expiresIn : "1h"} )

 res.json({token : token})

 })

  const  editProfile = asyncHanlder(async  (req, res)  =>  {

     const {profileId} = req.params
     const {username, bio, avatar, cover, interests} = req.body

       const user  = await User.findByIdAndUpdate(profileId, {
        username,
        bio,
        avatar,
        interests,
        cover
       })

       if(!user){
        return  res.status(constants.VALIDATION_ERROR).json({message : "no user found"})
       }

        res.status(201).send("Profile updated")

  })


   const followUser = asyncHanlder (async (req, res)  =>  {

      const {profileId} = req.params
      const {userId} = req.body

       const profile = await User.findById(profileId)
       const userProfile = await User.findById(userId)

       if(!profile){
        return res.status(constants.VALIDATION_ERROR).json({message : "no profile found"})
       }

       if(profile.followers.includes(userId)){
        res.status(constants.VALIDATION_ERROR).json({message : "user have followed"})
       }


         // reward users for following users

         incrementXPForFollowingUser(userId)

       profile.followers.push(userId)
       userProfile.following.push(profileId)

       await profile.save()
       await userProfile.save()

       res.status(201).send(`${userProfile.address} followed  ${profile.address}`)

   })


     const getAllUsers  =  asyncHanlder(async (req, res)  =>  {
       const users = await User.find()

        res.status(200).send(users)
       
     })


     const getUser = asyncHanlder(async (req, res) => {
      const {profileId} = req.params

       const user = await User.findById(profileId)

       if(! user) {
        return res.status(constants.NOT_FOUND).send("no user found")
       }

       res.status(200).send(user)
     })
 module.exports = {getNonce, verifyNonce, editProfile, followUser, getAllUsers, getUser}