const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
	create,
	categoryById,
	read,
	update,
	remove,
	list,
} = require("../controllers/category");
const { userById } = require("../controllers/user");

router.post("/category/create/:userId", requireSignin, isAdmin, isAuth, create);
router.put(
	"/category/:categoryId/:userId",
	requireSignin,
	isAdmin,
	isAuth,
	update
);
router.delete(
	"/category/:categoryId/:userId",
	requireSignin,
	isAdmin,
	isAuth,
	remove
);
router.get("/category/:categoryId", read);
router.get("/categories", list);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
