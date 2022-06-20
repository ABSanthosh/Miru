import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "./BlockDetails.scss";
import { getBlock } from "../../../utils/web3Helper";
import age from "../../../utils/UnixTimestamp";
import DataCard from "../../../components/DataCard/DataCard";
import Web3 from "web3";
import PercentBar from "../../../components/PercentBar/PercentBar";

function BlockDetails() {
  const { blockNumber } = useParams();
  const [blockData, setBlockData] = useState({});
  // const [txn, setTxn] = useState([]);

  useEffect(() => {
    getBlock(blockNumber, setBlockData, () => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);

  return (
    <div className="BlockDetailsWrapper MainWrapper">
      <Header blockChain="eth" isShrink />
      <div className="BlockDetailsWrapper__container">
        <div className="BlockDetailsWrapper__container--title">
          Block&nbsp;{`#${blockNumber}`}
        </div>
        <div className="BlockDetailsWrapper__container--content">
          {blockData && (
            <>
              <DataCard
                title="Block Height"
                toolTip="Also known as Block Number. The block height, which indicates the length of the blockchain,increases after the addition of the new block."
              >
                {blockNumber}
              </DataCard>
              <DataCard
                title="Block Hash"
                toolTip="The hash of the block header of the current block."
              >
                {blockData.hash}
              </DataCard>

              <DataCard
                title="Block Timestamp"
                toolTip="The date and time at which a block is mined."
              >
                {age(blockData.timestamp)}
              </DataCard>

              {blockData.transactions && (
                <DataCard
                  title="Block Transactions"
                  toolTip="The number of transactions in the block. Transactions are the result of contract execution that involves Ether value."
                >
                  <a href={`/eth/transactions/${blockNumber}`}>
                    {blockData.transactions.length}
                  </a>
                </DataCard>
              )}

              <DataCard
                title="Block Gas Used"
                toolTip="The total gas used in the block and its percentage of gas filled in the block."
              >
                <div
                  style={{
                    width: "90%",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {blockData.gasUsed}
                  <PercentBar
                    percent={Math.round(
                      (blockData.gasUsed / blockData.gasLimit) * 100
                    )}
                  />
                </div>
              </DataCard>

              <DataCard
                title="Block Gas Limit"
                toolTip="Total gas limit provided by all transactions in the block."
              >
                {blockData.gasLimit}
              </DataCard>

              <DataCard
                title="Block Difficulty"
                toolTip="The amount of effort required to mine a new block. The difficulty algorithm may adjust according to time."
              >
                {blockData.difficulty}
              </DataCard>

              {blockData.extraData && (
                <DataCard
                  title="Block Extra Data"
                  toolTip="Any data that can be included by the miner in the block."
                >
                  {Web3.utils.toAscii(blockData.extraData)}
                </DataCard>
              )}

              <DataCard
                title="Block Miner"
                toolTip="Miner who successfully include the block onto the blockchain."
              >
                <a href={`/eth/address/${blockData.miner}`}>
                  {blockData.miner}
                </a>
              </DataCard>

              <DataCard
                title="Block Nonce"
                toolTip="Block nonce is a value used during mining to demonstrate proof of work for a block."
              >
                {blockData.nonce}
              </DataCard>

              <DataCard
                title="Block Number"
                toolTip="Also known as Block height. The block Number, which indicates the length of the blockchain,increases after the addition of the new block."
              >
                {blockData.number}
              </DataCard>

              <DataCard
                title="Block Parent Hash"
                toolTip="The hash of the block from which this block was generated, also known as its parent block."
              >
                {blockData.parentHash}
              </DataCard>

              <DataCard
                title="Block Sha3 Uncles"
                toolTip="The mechanism which Ethereum Javascript RLP encodes an empty string."
              >
                {blockData.sha3Uncles}
              </DataCard>

              <DataCard
                title="Block Transactions Root"
                toolTip="The root hash of the Merkle tree of transactions of the block."
              >
                {blockData.transactionsRoot}
              </DataCard>

              <DataCard
                title="Block State Root"
                toolTip="The root of the state trie"
              >
                {blockData.stateRoot}
              </DataCard>

              <DataCard
                title="Block Total Difficulty"
                toolTip="Total difficulty of the chain until this block."
              >
                {blockData.totalDifficulty}
              </DataCard>

              {blockData.uncles && blockData.uncles.length > 0 && (
                <DataCard
                  title="Block Uncles"
                  toolTip="Uncles blocks are valid but rejected as it is not on the longest chain which is the working mechanism of the blockchain."
                >
                  {blockData.uncles.length}
                </DataCard>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlockDetails;
