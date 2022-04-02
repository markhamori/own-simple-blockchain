const { Blockchain, Transaction } = require("./blockchain");

let HMARTXCoin = new Blockchain();

HMARTXCoin.createTransaction(new Transaction("address1", "address2", 100));
HMARTXCoin.createTransaction(new Transaction("address2", "address1", 50));

console.log("\n Starting the miner...");
HMARTXCoin.minePendingTransactions("hmartx-address");

console.log(
  "\nBalance of hmartx is",
  HMARTXCoin.getBalanceOfAddress("hmartx-address")
);

console.log("\n Starting the miner again...");
HMARTXCoin.minePendingTransactions("hmartx-address");

console.log(
  "\nBalance of hmartx is",
  HMARTXCoin.getBalanceOfAddress("hmartx-address")
);
