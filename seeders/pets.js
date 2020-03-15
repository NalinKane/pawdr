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
        breed: "Labrador Retriever",
        age: "1",
        photo:
          "https://thehappypuppysite.com/wp-content/uploads/2019/03/How-Long-Do-Labrador-Retriever-Live-long.jpg",
        location: "Shifnal"
      },
      {
        name: "Milo",
        breed: "Labrador Retriever",
        age: "1",
        photo:
          "https://thehappypuppysite.com/wp-content/uploads/2019/03/How-Long-Do-Labrador-Retriever-Live-long.jpg",
        location: "Shifnal"
      },
      {
        name: "Rex",
        breed: "Labrador Retriever",
        age: "1",
        photo:
          "https://thehappypuppysite.com/wp-content/uploads/2019/03/How-Long-Do-Labrador-Retriever-Live-long.jpg",
        location: "Shifnal"
      },
      {
        name: "Tuna",
        breed: "Labrador Retriever",
        age: "1",
        photo:
          "https://thehappypuppysite.com/wp-content/uploads/2019/03/How-Long-Do-Labrador-Retriever-Live-long.jpg",
        location: "Shifnal"
      },
      {
        name: "Pixi",
        breed: "Labrador Retriever",
        age: "1",
        photo:
          "https://thehappypuppysite.com/wp-content/uploads/2019/03/How-Long-Do-Labrador-Retriever-Live-long.jpg",
        location: "Shifnal"
      },
      {
        name: "Moo",
        breed: "Labrador Retriever",
        age: "1",
        photo:
          "https://thehappypuppysite.com/wp-content/uploads/2019/03/How-Long-Do-Labrador-Retriever-Live-long.jpg",
        location: "Shifnal"
      }
    ]
  }
];
