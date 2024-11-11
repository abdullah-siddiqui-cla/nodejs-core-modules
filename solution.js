const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { randomString, encrypt, decrypt } = require("./lib");

// Task 1
function generatePassword(length = 12) {
  return randomString(length);
}

// Task 2
const masterKey = "abdullah";

function encryptPassword(password) {
  return encrypt(password, masterKey);
}

// Task 2.5
function decryptPassword(encryptedPassword, masterKey) {
  return decrypt(encryptedPassword, masterKey);
}

// Task 3
const passwordsFile = path.join(__dirname, "passwords.json");

function readPasswords() {
  if (!fs.existsSync(passwordsFile)) {
    return {};
  }
  const data = fs.readFileSync(passwordsFile, "utf8");
  return JSON.parse(data);
}

// Task 4
function savePassword(siteName, encryptedPassword) {
  const passwords = readPasswords();
  passwords[siteName] = encryptedPassword;
  fs.writeFileSync(passwordsFile, JSON.stringify(passwords, null, 2), "utf8");
}

// Task 5
function retrievePassword(siteName) {
  const passwords = readPasswords();
  const encryptedPassword = passwords[siteName];
  if (!encryptedPassword) {
    console.log(`No password found for site: ${siteName}`);
    return;
  }
  const decryptedPassword = decryptPassword(encryptedPassword, masterKey);
  console.log(`Password for ${siteName}: ${decryptedPassword}`);
}

// Task 6
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function startCLI() {
  rl.question("Enter command (generate/save/retrieve): ", (command) => {
    if (command === "generate") {
      rl.question("Enter desired password length: ", (length) => {
        const password = generatePassword(Number(length));
        console.log(`Generated Password: ${password}`);
        rl.close();
      });
    } else if (command === "save") {
      rl.question("Enter site name: ", (siteName) => {
        rl.question("Enter password: ", (password) => {
          const encryptedPassword = encryptPassword(password);
          savePassword(siteName, encryptedPassword);
          console.log(`Password saved for ${siteName}`);
          rl.close();
        });
      });
    } else if (command === "retrieve") {
      rl.question("Enter site name: ", (siteName) => {
        retrievePassword(siteName);
        rl.close();
      });
    } else {
      console.log("Unknown command");
      rl.close();
    }
  });
}

startCLI();
