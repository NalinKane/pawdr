const express = require("express");
const passport = require("passport");
const router = express.Router();
const Pet = require("../../models/Pet");
const User = require("../../models/User");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = res.req;
      const searchTerm = req.body.query;

      const owner = await User.findOne({ _id: user._id });

      // find pets excluding current owner's ones
      const query = Pet.find({
        location: searchTerm
      })
        .where("ownerId")
        .ne(owner._id);

      query.getFilter();

      const ownerPets = await query.exec();

      const transformedOwnerPets = ownerPets.map(pet => {
        return {
          name: pet.name,
          breed: pet.breed,
          age: pet.age,
          photo: pet.photo,
          id: pet._id
        };
      });

      res.send(transformedOwnerPets);
    } catch (error) {
      console.warn(error);
    }
  }
);

module.exports = router;
