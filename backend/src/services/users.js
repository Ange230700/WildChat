const { faker } = require("@faker-js/faker");

const users = [];
const numberOfUsers = 10;

for (let index = 0; index < numberOfUsers; index += 1) {
  users.push({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    hashed_password: faker.internet.password(),
    online_status: faker.number.binary(),
  });
}

module.exports = users;
