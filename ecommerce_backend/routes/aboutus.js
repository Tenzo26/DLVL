const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { updateAboutUs, removeAboutUs, getDesc} = require("../controllers/aboutus");

router.param("userId", userById);
// router.get("/getDesc", getDesc); will cause error to home. >.<
router.put("/updateAboutUs/:userId", requireSignin, isAdmin, isAuth, updateAboutUs);
router.delete("/removeAboutUs/:userId", requireSignin, isAdmin, isAuth, removeAboutUs);
router.get("/aboutUs",getDesc)

module.exports = router;
