require("dotenv").config();

const bcrypt = require("bcryptjs");
const seeder = require("mongoose-seed");
const db = require("../config/keys").mongoURI;

async function hashPasswords(data) {
  // Create list of promises per each user
  const promises = data.map(function(user) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        resolve(user);
      });
    });
  });

  return Promise.all(promises);
}

seeder.connect(db, async () => {
  seeder.loadModels(["models/User.js"]);

  const users = await hashPasswords(data[0].documents);
  data[0].documents = users;

  seeder.clearModels(["users"], function() {
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: "users",
    documents: [
      {
        firstName: "Shaggy",
        lastName: "Scragmore",
        location: "Shifnal",
        username: "shagger",
        email: "shagmore@gmail.com",
        password: "123123"
      },
      {
        firstName: "Sean",
        lastName: "Bean",
        location: "Shifnal",
        username: "beanz",
        email: "sbean@gmail.com",
        password: "qwerty"
      },
      {
        firstName: "Lily",
        lastName: "Belle",
        location: "Shrewsbury",
        username: "lbell",
        email: "lilz@aol.com",
        password: "password"
      },
      {
        firstName: "Rufus",
        lastName: "Dufus",
        location: "Shrewsbury",
        username: "Drufus",
        email: "druffy@gmail.com",
        password: "lame123"
      },
      {
        firstName: "Sin",
        lastName: "Tzu",
        location: "Shrewsbury",
        username: "Stint",
        email: "sintzu@gmail.com",
        password: "oynoy"
      },
      {
        firstName: "Kelly",
        lastName: "Craig",
        location: "Shrewsbury",
        username: "Kellz",
        email: "lula@gmail.com",
        password: "nomnom"
      },
      {
        firstName: "Kacper",
        lastName: "Lebiedziewicz",
        location: "Shifnal",
        username: "kasperoo",
        email: "kasperoo@outlook.com",
        password: "qwerty"
      }
    ]
  }
];
