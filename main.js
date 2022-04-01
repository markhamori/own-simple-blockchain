const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
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
    this.difficulty = 4;
  }

  createGenesisBlock() {
    return new Block(0, "22/02/2022", "Genesis block", "0");
  }

  getLatesBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatesBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
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

console.log("Mining block 1...");
HMARTXCoin.addBlock(new Block(1, "01/04/2022", { amount: 4 }));
console.log("Mining block 2...");
HMARTXCoin.addBlock(new Block(2, "12/04/2022", { amount: 10 }));

// Verify the integrity of our blockchain
// console.log("Is blockchain valid? " + HMARTXCoin.isChainValid());

// console.log(JSON.stringify(HMARTXCoin, null, 4));

// Temper the block chain
// HMARTXCoin.chain[1].data = { amount: 100 };
// HMARTXCoin.chain[1].hash = HMARTXCoin.chain[1].calculateHash();

// console.log("Is blockchain valid?" + HMARTXCoin.isChainValid());
