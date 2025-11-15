const express= require("express");
const router= express.Router();
const User= require("../models/user.js");
const wrapAsync = require("../utils(error)/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js")

// sign up

// render signup form & signup submit

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

// Login form & task after login

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.login)

// logout

router.get("/logout", userController.logout )

module.exports= router;