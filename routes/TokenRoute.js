const express = require("express")
const router = require("./AuthRoute")
const { saveToken, getAllTokens, getUserTokens } = require("../controllers/TokenController")


const ruoter = express.Router()

router.route("/new-token").post(saveToken)

router.route("/").get(getAllTokens)

router.route("/get-user-tokens").get(getUserTokens)

module.exports = router