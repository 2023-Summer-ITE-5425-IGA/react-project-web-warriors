const Order = require('../models/orderModel');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require("express-async-handler");
const auth = require("../middleware/authMiddleware");

// Place an order
const placeOrder = [auth, asyncHandler(async (req, res) => {
  try {
    const { flowers } = req.body;
    const orderId = uuidv4(); // Generate a unique order ID
    const u_id = req.user.id;
    const order = await Order.create({ orderId, u_id, flowers });
    res.status(201).json(order);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
})];

// Get all orders
const getOrders = [auth, asyncHandler(async (req, res) => {
  try {
    const u_id = req.user.id;
    const orders = await Order.find({u_id}).populate('flowers').exec();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ message: 'Failed to get orders' });
  }
})];

// Cancel an order
const cancelOrder = [auth, asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: 'Cancelled' },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Failed to cancel order' });
  }
})];

// Remove an order
const removeOrder = [auth, asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: 'Order removed successfully' });
  } catch (error) {
    console.error('Error removing order:', error);
    res.status(500).json({ message: 'Failed to remove order' });
  }
})];

module.exports = { placeOrder, getOrders, cancelOrder, removeOrder };
