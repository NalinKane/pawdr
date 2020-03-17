const express = require("express");
const passport = require("passport");
const router = express.Router();
const { Pet, User, Match } = require("../../models");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = res.req;
      const searchTerm = req.body.query;

      const owner = await User.findOne({ _id: user._id });

      // find all active like/dislike requests and exclude them later
      const userMatchRequests = await Match.find({
        userId: owner._id
      });

      const excludedIds = userMatchRequests.map(match => {
        return match.toUserId;
      });

      // find pets excluding current owner's ones
      const query = Pet.find({
        location: searchTerm,
        ownerId: { $nin: excludedIds }
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
