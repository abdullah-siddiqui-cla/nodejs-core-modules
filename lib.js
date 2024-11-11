const crypto = require("crypto");

function randomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.random();
    const index = Math.floor(randomNumber * chars.length);
    password += chars.charAt(index);
  }
  return password;
}

function encrypt(string, key) {
  const cipher = crypto.createCipher("aes-256-ctr", key);
  let encrypted = cipher.update(string, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(cipher, key) {
  const decipher = crypto.createDecipher("aes-256-ctr", key);
  let decrypted = decipher.update(cipher, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = {
  randomString,
  encrypt,
  decrypt,
};
