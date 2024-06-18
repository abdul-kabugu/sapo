const crypto  =  require("crypto")
const express = require("express");
const connectionDb  =  require("./lib/dbConnection")
const cors = require('cors');
const env = require("dotenv").config();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express();
connectionDb();
//app.use(bodyParser.json());

app.use(express.json());
app.use(cors())
//app.use(express.json());
app.use("/api/auth", require("./routes/AuthRoute"))
app.use("/api/post", require("./routes/PostRoute"))
app.use("/api/comments", require("./routes/CommentsRoute"))
app.use("/api/tokens", require("./routes/TokenRoute"))



app.listen(PORT, ()=> {
    console.log("app  started at")
}  )