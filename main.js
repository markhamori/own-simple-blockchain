const SHA256 = require("crypto-js/sha256");

// Create transactions class
class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    // Modify the block to supports multiple transactions
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  // Use sha-256 library for hashing
  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  // With this function we want that our block's hash starts with a certain amount zero's
  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block("22/02/2022", "Genesis block", "0");
  }

  getLatesBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log("Block successfully mined!");
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  // Adding validation functionality
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousHash = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousHash.hash) {
        return false;
      }
    }

    return true;
  }
}

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
