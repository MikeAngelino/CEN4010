const express = require("express");
const router = express.Router();
const Cart = require("../../models/cart");

// @route GET api/cart
// @desc Gets all the carts within the database
// @access Public
router.get("/", (req, res) => {
  Cart.find().then((carts) => res.json(carts));
});

// @route GET api/cart/:id
// @desc Gets all the carts of a specific user within the database
// @access Public
router.get("/:id", (req, res) => {
  Cart.findOne({ userId: req.params.id }).then((cart) => res.json(cart));
});

// @route POST api/cart
// @desc Post the cart within the database
// @access Public
router.post("/", (req, res) => {
  const { data, userId } = req.body;
  //   Add or modify the cart of the user
  cart
    .update(
      { userId },
      {
        $push: {
          products: data,
        },
      },
      {
        upsert: true,
      }
    )
    .then(() => res.json({ success: 1 }))
    .catch((err) => res.json({ success: 0, message: err.message }));
});

// @route DELETE api/cart/:id
// @desc DELETE the cart within the database
// @access Public
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Cart.findByIdAndDelete(id)
    .then(() => res.json({ success: 1 }))
    .catch((err) => res.json({ success: 0, message: err.message }));
});

module.exports = router;
