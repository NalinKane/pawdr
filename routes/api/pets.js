const express = require("express");
const passport = require("passport");
const router = express.Router();
const { Pet, User, Match } = require("../../models");

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
        ownerId: petOwner._id,
        location: petOwner.location
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

// @route POST api/pets/update
// @desc Update existing pet
// @access Private
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user, body } = res.req;
      const petOwner = await User.findOne({ _id: user._id });

      if (!body.id) {
        return res.status(400).json({ pet: "Pet not found" });
      }

      const updatedPet = await Pet.findByIdAndUpdate(
        { _id: body.id },
        {
          name: body.name,
          breed: body.breed,
          age: body.age,
          photo: body.photo
        }
      );

      updatedPet
        .save()
        .then(pet => res.json(pet))
        .catch(err => console.log(err));
    } catch (error) {
      console.warn(error);
    }
  }
);

// @route GET api/pets/show
// @desc Show owners pets
// @access Private
router.get(
  "/show",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = res.req;

      const owner = await User.findOne({ _id: user._id });

      const query = Pet.find({
        ownerId: owner._id
      });

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

// @route POST api/pets/matchRequest
// @desc Like or dislike a pet
// @access Private
router.post(
  "/matchRequest",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user, body } = res.req;

      // currently logged in user
      const currentUser = await User.findOne({ _id: user._id });

      // target pet && user
      const targetPet = await Pet.findOne({ _id: body.id });
      const targetUser = await User.findOne({ _id: targetPet.ownerId });

      const newMatch = new Match({
        userId: currentUser._id,
        toUserId: targetUser._id,
        match: body.match
      });

      newMatch
        .save()
        .then(match => res.json(match))
        .catch(err => console.log(err));
    } catch (error) {
      console.warn(error);
    }
  }
);

// @route GET api/pets/getMatches
// @desc Show matched pets
// @access Private
router.get(
  "/getMatches",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = res.req;

      const owner = await User.findOne({ _id: user._id });

      const matches = await Match.find({
        toUserId: owner._id,
        match: true
      });

      const targetIds = matches.map(match => {
        return match.userId;
      });

      const query = Pet.find({
        ownerId: { $in: targetIds }
      });

      query.getFilter();

      const matchedPets = await query.exec();

      const transformedMatches = matchedPets.map(pet => {
        return {
          name: pet.name,
          breed: pet.breed,
          age: pet.age,
          photo: pet.photo,
          id: pet._id
        };
      });

      res.send(transformedMatches);
    } catch (error) {
      console.warn(error);
    }
  }
);

module.exports = router;
