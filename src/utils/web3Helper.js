import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i += 1) {
    result.push(i);
  }
  return result;
};

export default function getNBlocks(n, cb) {
  let blocks = [];

  web3.eth.getBlockNumber().then((blockNumber) => {
    const blockRange = range(blockNumber - n, blockNumber);
    const batch = new web3.eth.BatchRequest();

    blockRange.forEach((block) => {
      batch.add(
        web3.eth.getBlock.request(block, true, (err, blockItem) => {
          blockItem.blockNo = block;
          blocks = [...blocks, blockItem];
          if (blocks.length === n) {
            blocks = blocks.reverse();
            cb(blocks);
          }
        })
      );
    });
    batch.execute();
  });
}
