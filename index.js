// Task 1. 

const fs = require('fs');
const path = require('path');
const { randomString, encrypt } = require('./lib');

function generatePassword(length = 12) {
  const random = randomString(length);
  return random;
}

const masterKey = 'abdullah';

function encryptPassword(password) {
  // encrypt the password's data

  const encryptedPassword = encrypt(password, masterKey)

  return encryptedPassword;
}

function readPasswords() {
  // Import the contents of passwords.json file

  // 1. Get the path to the file
  const passwordsFile = path.join(__dirname, "passwords.json");

  if (!fs.existsSync(passwordsFile)) {
    console.log("The file doesn't exist");
    return {}
  }

  const content = fs.readFileSync(passwordsFile, "utf8");

  const passwords = JSON.parse(content)

  console.log(passwords);
}

readPasswords();
