const { faker } = require("@faker-js/faker");

const users = [];
const numberOfUsers = 4;

for (let index = 0; index < numberOfUsers; index += 1) {
  users.push({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
}

module.exports = users;
