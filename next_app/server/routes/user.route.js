module.exports = app => {

    const express = require("express");
    const router = express.Router();

    const users = require("../controllers/user.controller.js");    

    

    // Signup Route
    router.post("/user/signup", users.createAccount);


    // Login Route
    router.post("/user/login", users.signIn);


    app.use("/api/v1", router);

};