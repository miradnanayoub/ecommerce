const express = require("express");
const crypto = require("crypto");
const razorpayInstance = require("../config/razorpay");

const router = express.Router();

// Create Order
router.post("/create-order", async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpayInstance.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify Payment
router.post("/verify-payment", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                                    .update(body)
                                    .digest("hex");

    if (expectedSignature === razorpay_signature) {
        res.json({ success: true, message: "Payment verified successfully!" });
    } else {
        res.status(400).json({ success: false, message: "Invalid signature!" });
    }
});

module.exports = router;
