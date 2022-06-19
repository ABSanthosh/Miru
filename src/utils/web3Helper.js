import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i += 1) {
    result.push(i);
  }
  return result;
};

export function getNBlocks(n, cb, txnCb) {
  let blocks = [];
  let transactions = [];

  web3.eth.getBlockNumber().then((blockNumber) => {
    const blockRange = range(blockNumber - n + 1, blockNumber);
    const batch = new web3.eth.BatchRequest();

    blockRange.forEach((block) => {
      batch.add(
        web3.eth.getBlock.request(block, true, (err, blockItem) => {
          if (err) return console.log(err);
          blockItem.blockNo = block;
          blocks = [...blocks, blockItem];
          transactions = [...transactions, ...blockItem.transactions];
          if (blocks.length === n) {
            blocks = blocks.reverse();
            transactions = transactions.reverse();
            cb(blocks);
            console.log(transactions)
            txnCb(transactions);
          }
        })
      );
    });
    batch.execute();
  });
}

export const round = (num, n = 2) => {
  const factor = 10 ** n;
  return Math.floor(num * factor) / factor;
};

export function getBlock(blockNo, cb, txnCb) {
  web3.eth.getBlock(blockNo, true, (err, blockItem) => {
    if (err) return console.log(err);
    const txn = blockItem.transactions.reverse();
    txnCb(txn);
    console.log(blockItem);
    cb(blockItem);
  });
}

export function getBalance(address, cb) {
  web3.eth.getBalance(address, (err, balance) => {
    if (err) return console.log(err);
    const bal = {
      balance: balance,
      ether: round(web3.utils.fromWei(balance, "ether"), 3),
    };
    cb(bal);
  });
}

export function getTransactionCount(address, cb) {
  web3.eth.getTransactionCount(address, (err, count) => {
    if (err) return console.log(err);
    cb(count);
  });
}

export function getStorageAt(address, position, cb) {
  web3.eth.getStorageAt(address, position, (err, storage) => {
    if (err) return console.log(err);
    cb(storage);
  });
}

