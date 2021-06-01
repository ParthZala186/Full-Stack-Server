const express = require("express");
const router = express.Router()
const { Posts, Comments } = require("../models")
const { validateToken } = require("../middleware/AuthMiddleWare");
const { route } = require("./Users");
router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { postId: postId } })
    res.json(comments)
})


router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    console.log("username === ", req.user)
    const userName = req.user.username;
    comment.userName = userName
    console.log("comment  =", comment)
    await Comments.create(comment);
    res.json(comment)
})

router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId
    await Comments.destroy({ where: { id: commentId } })

    res.json("Deleted SuccessFully")
})

module.exports = router;