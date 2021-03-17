const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
	{
		product: { type: ObjectId, ref: "Product" },
		name: String,
		price: Number,
		count: Number
	},
	{ timestamps: true }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);

const OrderSchema = new mongoose.Schema(
	{
		products: [CartItemSchema],
		amount: { type: Number },
		address: String,
		status: {
			type: String,
			default: "Processing",
			enum: ["Processing", "Paid", "Shipped", "Delivered", "Cancelled"],
		},
		updated: Date,
		user: { type: ObjectId, ref: "User" },
		size: String
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };
