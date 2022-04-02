# Create own blockhain

**Using Proof-of-Work mechanism**
_(We need to put a lot of computing power into making a block - this process is also call mining)_

**Security issues without PoW:**

- Anyone can change the contents of the block
- Recalculate the hashes all for all the blocks
- It ends up with a valid chain

**Mining rewards & transactions:**

- In Bitcoin's case, PoW algorithm make sura that there's only one block created every 10 minutes
- All the transactions that are made in between blocks are temporarily stored in this pendingTransactions array
- They can be included in the next block

**Section-3 - the current problem:**

- Any1 can make any that she/he wants (you can make a transaction and spend coins that aren't yours)

**Section-3 - the solution:**

- Transactions to be signed with a private and public key, that way we can only spend coins in a wallet if you have the private key of it

_Notes:_

- Private and public key are both unique.
- The public key is freely shareable with anyone. It's the address of your wallet.
- The private key on the other hand is used to sign transactions. It proves that the owner of the wallet is taking money out of it. _It should be kept secret so only you can spend your coins._
