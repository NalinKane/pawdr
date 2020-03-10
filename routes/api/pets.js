const express = require("express");
const passport = require("passport");
const router = express.Router();
const Pet = require("../../models/Pet");
const User = require("../../models/User");

// @route POST api/pets/create
// @desc Create pet
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = res.req;
      const petOwner = await User.findOne({ _id: user._id });

      const newPet = new Pet({
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age,
        photo: req.body.photo,
        ownerId: petOwner._id
      });

      newPet
        .save()
        .then(pet => res.json(pet))
        .catch(err => console.log(err));
    } catch (error) {
      console.warn(error);
    }
  }
);

module.exports = router;
