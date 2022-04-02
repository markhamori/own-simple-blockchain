const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "0ed993ae72f93245ac6ef6933fa909975aa31c4bc88d9a84bb0e08ed4a5f812c"
);
const myWalletAddress = myKey.getPublic("hex");

let HMARTXCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "public key goes here", 10);
tx1.signTransaction(myKey);
HMARTXCoin.addTransaction(tx1);

console.log("\n Starting the miner...");
HMARTXCoin.minePendingTransactions(myWalletAddress);

console.log(
  "\nBalance of hmartx is",
  HMARTXCoin.getBalanceOfAddress(myWalletAddress)
);

HMARTXCoin.chain[1].transactions[0].amount = 1;

console.log("Is chain valid", HMARTXCoin.isChainValid());
