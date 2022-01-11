const express = require('express');
const { isAuthenticatedUser } = require("../middlewares/auth");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");

const router = express.Router();

// Routes
router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripe/key").get(isAuthenticatedUser, sendStripeApiKey);


module.exports = router;