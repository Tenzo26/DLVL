const express = require("express");
const router = express.Router();

const {
	signupAdmin,
	signup,
	signin,
	forgot1, // STEP 1
	forgot2, // STEP 2
	signout,
	requireSignin,
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signup/admin/dlvladmin", signupAdmin);
router.post("/signin", signin);
router.post("/forgot1", forgot1); // STEP 1
router.post("/forgot2", forgot2); // STEP 2
router.get("/signout", signout);

router.get("/hello", requireSignin, (req, res) => {
	res.send("hello");
});

module.exports = router;
