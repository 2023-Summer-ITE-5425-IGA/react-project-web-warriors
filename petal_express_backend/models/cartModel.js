const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    u_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    f_id: { type: Number, required: true },
    quantity: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartSchema);
