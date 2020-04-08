const express = require("express");
const router = express.Router();
const WishList = require("../../models/WishList");

// @route GET api/wishlist
// @desc Gets all the wishlists within the database
// @access Public
router.get("/", (req, res) => {
  WishList.find().then((wishLists) => res.json(wishLists));
});

// @route GET api/wishlist/:id
// @desc Gets all the wishlists of a specific user within the database
// @access Public
router.get("/:id", (req, res) => {
  WishList.findOne({ userId: req.params.id }).then((wishList) =>
    res.json(wishList)
  );
});

// @route POST api/wishlist
// @desc Post the wishlist within the database
// @access Public
router.post("/", (req, res) => {
  const { data, userId } = req.body;
  //   Add or modify the wishlist of the user
  WishList.update(
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

// @route DELETE api/wishlist/:id
// @desc DELETE the wishlist within the database
// @access Public
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  WishList.findByIdAndDelete(id)
    .then(() => res.json({ success: 1 }))
    .catch((err) => res.json({ success: 0, message: err.message }));
});

module.exports = router;
