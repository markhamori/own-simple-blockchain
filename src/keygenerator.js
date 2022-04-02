// Elliptic library allow us to generate public and private key
// also has methods to sign something and verify a signature
const EC = require("elliptic").ec;

// Using any elliptic curve we want
const ec = new EC("secp256k1");

const key = ec.genKeyPair();
const publicKey = key.getPublic("hex");
const privateKey = key.getPrivate("hex");

console.log();
console.log("Private key: ", privateKey);

console.log();
console.log("Public key: ", publicKey);
