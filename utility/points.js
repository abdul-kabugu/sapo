const User = require("../models/UserModel")

const updateUserXP = async (userId, increment) => {
    const user = await User.findById( userId );

    if (user) {
        user.xp += increment;
        await user.save();
    }
};


const incrementXPForWatchingVideo = async (userId) => {
    await updateUserXP(userId, 0.5);
};

const incrementXPForCreatorOnVideoWatched = async (creatorId) => {
    await updateUserXP(creatorId, 1);
};

const incrementXPForLikingVideo = async (userId) => {
    await updateUserXP(userId, 0.5);
};

const incrementXPForCreatorOnVideoLiked = async (creatorId) => {
    await updateUserXP(creatorId, 0.02);
};

const incrementXPForFollowingUser = async (userId) => {
    await updateUserXP(userId, 0.5);
};

const incrementXPForCommenting = async (userId) => {
    await updateUserXP(userId, 0.5);
};


module.exports =  {updateUserXP
    , incrementXPForCommenting
    , incrementXPForCreatorOnVideoLiked
    , incrementXPForCreatorOnVideoWatched,
     incrementXPForFollowingUser,
      incrementXPForLikingVideo,
      incrementXPForWatchingVideo
    }