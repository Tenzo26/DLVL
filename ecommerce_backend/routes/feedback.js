const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const {
	pendingFeedback,
	updateFeedback,
	deleteFeedback,
	createFeedback,
	getPublishedFeedback,
	updateById,
	userUpdateById,
} = require("../controllers/feedback");

const { userById } = require("../controllers/user");

router.patch("/admin/adminFeedback/:id", updateById);
router.patch("/user/userFeedback/:id", userUpdateById);
router.get("/publishedFeedback", getPublishedFeedback);

router.get("/pendingFeedback", pendingFeedback);

router.post("/createFeedback/:userId", requireSignin, isAuth, createFeedback);

router.post("/updateFeedback/:id", updateFeedback);
router.delete("/deleteFeedback/:id", deleteFeedback);

router.param("userId",userById)

module.exports = router;
