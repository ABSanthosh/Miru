import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "./BlockDetails.scss";
import { getBlock } from "../../../utils/web3Helper";
import age from "../../../utils/UnixTimestamp";
import DataCard from "../../../components/DataCard/DataCard";
import Web3 from "web3";

function BlockDetails() {
  const { blockNumber } = useParams();
  const [blockData, setBlockData] = useState({});

  useEffect(() => {
    getBlock(blockNumber, setBlockData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="BlockDetailsWrapper MainWrapper">
      <Header blockChain="eth" isShrink />
      <div className="BlockDetailsWrapper__container">
        {/* <div className="BlockDetailsWrapper__container--title">
          Block&nbsp;{`#${blockNumber}`}
        </div> */}
        <div className="BlockDetailsWrapper__container--content">
          <DataCard title="Block Height">{blockNumber}</DataCard>

          <DataCard title="Block Hash">{blockData.hash}</DataCard>

          <DataCard title="Block Timestamp">
            {age(blockData.timestamp)}
          </DataCard>

          <DataCard title="Block Transactions">
            {blockData.transactions.length}
          </DataCard>

          <DataCard title="Block Gas Used">{blockData.gasUsed}</DataCard>

          <DataCard title="Block Gas Limit">{blockData.gasLimit}</DataCard>

          <DataCard title="Block Difficulty">{blockData.difficulty}</DataCard>

          <DataCard title="Block Extra Data">
            {Web3.utils.toAscii(blockData.extraData)}
            {blockData.extraData}
          </DataCard>

          <DataCard title="Block Miner">{blockData.miner}</DataCard>

          <DataCard title="Block Nonce">{blockData.nonce}</DataCard>

          <DataCard title="Block Number">{blockData.number}</DataCard>

          <DataCard title="Block Parent Hash">{blockData.parentHash}</DataCard>

          <DataCard title="Block Sha3 Uncles">{blockData.sha3Uncles}</DataCard>

          <DataCard title="Block Transactions Root">
            {blockData.transactionsRoot}
          </DataCard>

          <DataCard title="Block State Root">{blockData.stateRoot}</DataCard>

          <DataCard title="Block Total Difficulty">
            {blockData.totalDifficulty}
          </DataCard>

          <DataCard title="Block Uncles Hash">{blockData.uncles}</DataCard>

          <div className="DataCardWrapper">
            <div className="DataCardWrapper__title">Age</div>
            <div className="DataCardWrapper__content">
              {age(blockData.timestamp)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlockDetails;
