const express = require("express");
const router = express.Router()
const { Users } = require("../models")
const bcrypt = require('bcryptjs')
const { sign } = require('jsonwebtoken');
const { validateToken } = require("../middleware/AuthMiddleWare");

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            userName: username,
            password: hash
        })
        res.json("success")
    })
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { userName: username } });
    if (!user) res.json({ error: "User does not exist" });

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: "wrong username or password" });

        const accessToken = sign({ username: user.userName, id: user.id }, "important");

        res.json({ token: accessToken, username: username, id: user.id })
    })
});

router.get("/auth", validateToken, (req, res) => {
    res.json(req.user)
});

router.get("/basicInfo/:id", async (req, res) => {
    const id = req.params.id;
    const basicInfo = await Users.findByPk(id, {
        attributes: { exclude: ["password"] }
    });
    res.json(basicInfo)
});

router.put('/changePassword', validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({ where: { userName: req.user.username } });
    bcrypt.compare(oldPassword, user.password).then(async (match) => {
        if (!match) res.json({ error: "wrong password entered!" });

        await bcrypt.hash(newPassword, 10).then((hash) => {
            Users.update({ password: hash }, { where: { userName: req.user.username } })
            res.json("success")
        })
    })
})

module.exports = router;