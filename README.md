# Exercise: Password Generator & Saver CLI Application
In this exercise, you'll build a command line interface (CLI) tool in Node.js that generates a secure password, encrypts it, and stores it in a file. You’ll also be able to retrieve stored passwords by decrypting them using a master key. The application will gradually introduce core Node.js modules that are useful in real-world applications.

# Application Description
This CLI application allows users to generate secure passwords, save them in a file, and retrieve them later. Users specify the password length, and each password is stored in an encrypted format, protected by a master key. Follow the tasks below to build the application step-by-step.

# Tasks
## Task 1: Create the `generatePassword` Method
- Define a method named `generatePassword`.
    - The method should take a length parameter (default to 12) and generate a random password string.
- Use the `randomString` function from a utility file (`lib.js`) to create the password.

## Task 2: Create the `encryptPassword` Method
- Define a method named `encryptPassword`.
    - This method takes two arguments: a password to encrypt and a key.
    - Uses `encrypt` function from a utility file (`lib.js`) to encrypt the password. `encrypt` method takes `key` as a second argument. In encryption, a `key` is secret string that encrypts or decrypts the data. You can create a global function, `masterKey` for that purpose.

## Task 3: Create the `readPasswords` Method
- Define a method named readPasswords.
  - This method reads the contents of a JSON file (`passwords.json`) where passwords are stored. If the file doesn't exist, return an empty object.
    - Hint: Use the Node.js `fs` module to read the file, and handle errors (like "file not found").
    - Note: Include Node.js’s `path` module to work with file paths reliably across different systems.

## Task 4: Create the `savePassword` Method
- Define a method named `savePassword`.
  - The method should take `siteName` and `encryptedPassword` as arguments.
  - Use `readPasswords` to load existing passwords into an object.
  - Add the `siteName` as a key with `encryptedPassword` as its value, then save this updated object back to `passwords.json`.
  - Hint: Use JSON.stringify() to write the object back to the file.

## Task 5: Create the `retrievePassword` Method
- Define a method named `retrievePassword`.
- This method takes `siteName` and uses `readPasswords` to look up the encrypted password for that site.
- Decrypt the password using a `decrypt` method from `lib.js`, passing in both the encrypted password and the `masterKey` as arguments.
- Note: Use console.log to print out the decrypted password if found.

## Task 6: Create a Command Line Interface
- Use the Node.js `readline` module to build a CLI for the application.
- Create a function named `startCLI` to take user input for different commands: generate, save, or retrieve.
  - Based on the input command:
    - generate: Prompt for a password length and display the generated password.
    - save: Prompt for a siteName and password, then encrypt and save the password.
    - retrieve: Prompt for a siteName and display the decrypted password.

Here’s a starting example for the CLI:

```
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
          const encryptedPassword = encryptPassword(password, masterKey);
          savePassword(siteName, encryptedPassword);
          console.log(`Password saved for ${siteName}`);
          rl.close();
        });
      });
    } else if (command === "retrieve") {
      rl.question("Enter site name: ", (siteName) => {
        retrievePassword(siteName, masterKey);
        rl.close();
      });
    } else {
      console.log("Unknown command");
      rl.close();
    }
  });
}

startCLI();
```

# Testing
After completing the tasks, test the program by:

- Generating a password.
- Saving it with a site name.
- Retrieving it with the master key.

This exercise should give you hands-on experience with encryption, file handling, and creating a CLI in Node.js. Happy coding!