const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
	create,
	productById,
	read,
	remove,
	update,
	list,
	listRelated,
	listCategories,
	listBySearch,
	photo,
	listSearch,
} = require("../controllers/product");
const { userById } = require("../controllers/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAdmin, isAuth, create);
router.param("userId", userById);
router.param("productId", productById);
router.delete(
	"/product/:productId/:userId",
	requireSignin,
	isAdmin,
	isAuth,
	remove
);
router.put(
	"/product/:productId/:userId",
	requireSignin,
	isAdmin,
	isAuth,
	update
);
router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);
router.get("/products/search", listSearch);

module.exports = router;
