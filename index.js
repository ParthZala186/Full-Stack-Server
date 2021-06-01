const express = require('express');
const cors = require("cors")
const app = express();
require("dotenv").config()
app.use(express.json())
app.use(cors())
const db = require("./models");

const postRouter = require("./routes/Posts");
const commentsRouter = require("./routes/Comments");
const usersRouter = require("./routes/Users");
const likesRouter = require("./routes/Likes")
app.use("/posts", postRouter)
app.use("/comments", commentsRouter)
app.use("/auth", usersRouter)
app.use("/like", likesRouter)


db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log("server is up on port 3001")
    })
})
    .catch((err) => {
        console.log(err);
    })

