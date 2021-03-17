const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
	create,
	collectionById,
	read,
	update,
	remove,
	list,
} = require("../controllers/collection");
const { userById } = require("../controllers/user");

router.post("/collection/create/:userId", requireSignin, isAdmin, isAuth, create);
router.put(
	"/collection/:collectionId/:userId",
	requireSignin,
	isAdmin,
	isAuth,
	update
);
router.delete(
	"/collection/:collectionId/:userId",
	requireSignin,
	isAdmin,
	isAuth,
	remove
);
router.get("/collection/:collectionId", read);
router.get("/collections", list);

router.param("userId", userById);
router.param("collectionId", collectionById);

module.exports = router;
