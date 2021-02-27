const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { changeBg, removeBg, getBg } = require("../controllers/backgroundImage");
const { userById } = require("../controllers/user");

router.param("userId", userById);
router.get("/getBg", getBg);
router.put("/changeBg/:userId", requireSignin, isAdmin, isAuth, changeBg);
router.delete("/removeBg/:userId", requireSignin, isAdmin, isAuth, removeBg);

module.exports = router;
