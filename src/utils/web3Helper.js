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
            txnCb(transactions);
          }
        })
      );
    });
    batch.execute();
  });
}
