const express = require("express")
const router = require("./AuthRoute")
const { saveToken, getAllTokens } = require("../controllers/TokenController")


const ruoter = express.Router()

router.route("/new-token").post(saveToken)

router.route("/").get(getAllTokens)

module.exports = router