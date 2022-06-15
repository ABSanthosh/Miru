import React, { useEffect, useState } from "react";
// import Web3 from "web3";
import Header from "../../components/Header/Header";
import TabularView from "../../components/TabularView/TabularView";
import getNBlocks from "../../utils/web3Helper";
import "./Eth.scss";

function Eth() {
  const [blocksList, setBlocksList] = useState([]);

  // const web3 = new Web3(Web3.givenProvider);
  // const subscription = web3.eth.subscribe("newBlockHeaders");

  // subscription.on("data", async (block, error) => {
  //   console.log(block.number);
  //   getNBlocks(10, setBlocksList);
  // });

  useEffect(() => {
    getNBlocks(10, setBlocksList);

    const timeOut = setInterval(() => {
      getNBlocks(10, setBlocksList);
    }, 3 * 1000);
    setTimeout(() => {
      clearInterval(timeOut);
    }, 12 * 60 * 1000);
    return () => {
      clearInterval(timeOut);
    };
  }, []);

  return (
    <div className="EthWrapper">
      <Header blockChain="eth" />
      <div className="EthWrapper__container">
        <div className="EthWrapper__container--tableView">
          <TabularView
            type="Latest Blocks"
            rows={blocksList}
            headers={["Block No.", "Age", "Miner", "Txn"]}
            colWidth={["5%", "5%", "23%", "3%"]}
          />
        </div>
        {/* <div className="EthWrapper__container--tableView">
          <TabularView type="Transactions" />
        </div> */}
      </div>
    </div>
  );
}

export default Eth;
