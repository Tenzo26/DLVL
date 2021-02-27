const express = require("express");
const router = express.Router();
const {
	getFaq,
	createFaq,
	updateFaq,
	deleteFaq,
} = require("../controllers/faq");

router.get("/faq", getFaq);
router.post("/faq", createFaq);
router.patch("/faq/:id", updateFaq);
router.delete("/faq/:id", deleteFaq);

module.exports = router;
