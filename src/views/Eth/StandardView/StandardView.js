import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import TabularView from "../../../components/TabularView/TabularView";
import age from "../../../utils/UnixTimestamp";
import { getNBlocks } from "../../../utils/web3Helper";
import "./StandardView.scss";

function Eth() {
  const [blocksList, setBlocksList] = useState([]);
  const [transactionsList, setTransactionsList] = useState([]);

  useEffect(() => {
    getNBlocks(10, setBlocksList, setTransactionsList);

    // const timeOut = setInterval(() => {
    //   getNBlocks(10, setBlocksList, setTransactionsList);
    // }, 3 * 1000);
    // setTimeout(() => {
    //   clearInterval(timeOut);
    // }, 12 * 60 * 1000);
    // return () => {
    //   clearInterval(timeOut);
    // };
  }, []);

  return (
    <div className="EthWrapper">
      <Header blockChain="eth" />
      <div className="EthWrapper__container">
        <div className="EthWrapper__container--tableView">
          <TabularView
            type="Latest Blocks"
            headers={["Block", "Age", "Miner", "Txn"]}
            colWidth={["5%", "5%", "23%", "3%"]}
            viewMore={`/eth/blocks`}
            data={blocksList}
            rowCount={10}
          >
            {blocksList.map((row, index) => {
              return (
                <tr
                  key={index + row.sha3Uncles}
                  className="TabularViewWrapper__table-row"
                >
                  <td className="TabularViewWrapper__table-cell">
                    <a href={`/eth/block/${row.blockNo}`}>{row.blockNo}</a>
                  </td>
                  <td className="TabularViewWrapper__table-cell">
                    {age(row.timestamp)}
                  </td>
                  <td className="TabularViewWrapper__table-cell">
                    <a href={`/eth/address/${row.miner}`}>{row.miner}</a>
                  </td>
                  <td className="TabularViewWrapper__table-cell">
                    <a href={`/eth/transactions/${row.blockNo}`}>{row.transactions.length}</a>
                  </td>
                </tr>
              );
            })}
          </TabularView>
        </div>
        <div className="EthWrapper__container--tableView">
          <TabularView
            type="Transactions"
            headers={["Hash", "Block", "From", "", "To"]}
            colWidth={["10%", "10%", "18%", "3%", "18%"]}
            viewMore={`/eth/txn`}
            data={transactionsList}
            rowCount={10}
          >
            {transactionsList.slice(0, 10).map((row, index) => {
              return (
                <tr
                  key={index + row.blockHash}
                  className="TabularViewWrapper__table-row"
                >
                  <td className="TabularViewWrapper__table-cell">{row.hash}</td>
                  <td className="TabularViewWrapper__table-cell">
                    <a href={`/eth/block/${row.blockNumber}`}>{row.blockNumber}</a>
                  </td>
                  <td className="TabularViewWrapper__table-cell">
                    <a href={`/eth/address/${row.from}`}>{row.from}</a>
                  </td>
                  <td className="TabularViewWrapper__table-cell">➜</td>
                  <td className="TabularViewWrapper__table-cell">
                    <a href={`/eth/address/${row.to}`}>{row.to}</a>
                  </td>
                </tr>
              );
            })}
          </TabularView>
        </div>
      </div>
    </div>
  );
}

export default Eth;
