require("dotenv").config();

const seeder = require("mongoose-seed");
const db = require("../config/keys").mongoURI;
const User = require("../models/User");

function injectOwnerData(owners, pets) {
  pets.map((pet, i) => {
    pet.ownerId = owners[i]._id;
    pet.location = owners[i].location;
  });
}

seeder.connect(db, async () => {
  seeder.loadModels(["models/Pet"]);

  seeder.clearModels(["pets"], async function() {
    try {
      // assign pets to owners, one by one
      const allUsers = await User.find({});
      injectOwnerData(allUsers, data[0].documents);

      seeder.populateModels(data, function() {
        seeder.disconnect();
      });
    } catch (error) {
      console.warn(error);
    }
  });
});

const data = [
  {
    model: "pets",
    documents: [
      {
        name: "Luna",
        breed: "Labrador Retriever",
        age: "1",
        photo:
          "https://thehappypuppysite.com/wp-content/uploads/2019/03/How-Long-Do-Labrador-Retriever-Live-long.jpg",
        location: "Shifnal"
      },
      {
        name: "Vika",
        breed: "Greyhound",
        age: "1",
        photo:
          "https://cdn2-www.dogtime.com/assets/uploads/2011/01/file_23024_greyhound-460x290.jpg",
        location: "Shifnal"
      },
      {
        name: "Milo",
        breed: "Basset Hound",
        age: "3",
        photo:
          "https://www.pets4homes.co.uk/images/articles/4785/how-to-keep-your-basset-hounds-ears-clean-and-healthy-5b0dd32a46253.jpg",
        location: "Shifnal"
      },
      {
        name: "Rex",
        breed: "Welsh Corgi Pembroke",
        age: "5",
        photo:
          "https://vetstreet.brightspotcdn.com/dims4/default/79f1bd2/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F83%2F9e8de0a7f411e0a0d50050568d634f%2Ffile%2FPembroke-Welsh-Corgi-3-645mk62711.jpg",
        location: "Shifnal"
      },
      {
        name: "Tuna",
        breed: "Dachshund",
        age: "1",
        photo:
          "https://cdn2-www.dogtime.com/assets/uploads/gallery/dachshund-dog-breed-pictures/side-5_680-453.jpg",
        location: "Shifnal"
      },
      {
        name: "Pixi",
        breed: "Dalmatian",
        age: "3",
        photo:
          "https://cdn3-www.dogtime.com/assets/uploads/2011/01/file_23146_dalmatian-460x290.jpg",
        location: "Shifnal"
      },
      {
        name: "Moo",
        breed: "Labrador Retriever",
        age: "1",
        photo:
          "https://www.thelabradorsite.com/wp-content/uploads/2015/07/buying-a-chocolate-labrador-puppy.jpg",
        location: "Shifnal"
      },
      {
        name: "Dodo",
        breed: "Labradoodle",
        age: "5",
        photo:
          "https://media.boingboing.net/wp-content/uploads/2019/09/bruce-williamson-_U0emJI9o_E-unsplash.jpg",
        location: "Birmigham"
      },
      {
        name: "Zeena",
        breed: "Rottweiler",
        age: "3",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/2/26/Rottweiler_standing_facing_left.jpg",
        location: "Birmingham"
      },
      {
        name: "Floofen",
        breed: "Husky",
        age: "7",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/a/a3/Black-Magic-Big-Boy.jpg",
        location: "Birmingham"
      },
      {
        name: "Boink",
        breed: "Labrador Retriever",
        age: "4",
        photo:
          "https://image.shutterstock.com/image-photo/labrador-park-260nw-1057776890.jpg",
        location: "Shifnal"
      }
    ]
  }
];
