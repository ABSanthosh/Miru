import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Header from "../../../components/Header/Header";
import PercentBar from "../../../components/PercentBar/PercentBar";
import TabularView from "../../../components/TabularView/TabularView";
import age from "../../../utils/UnixTimestamp";
import { getNBlocks } from "../../../utils/web3Helper";
import "./BlocksView.scss";

function BlocksView() {
  const [blocksList, setBlocksList] = useState([]);
  const web3 = new Web3(Web3.givenProvider);

  useEffect(() => {
    getNBlocks(25, setBlocksList, (t) => {});
    // const timeOut = setInterval(() => {
    //   getNBlocks(25, setBlocksList, (t) => {});
    // }, 3 * 1000);
    // setTimeout(() => {
    //   clearInterval(timeOut);
    // }, 12 * 60 * 1000);
    // return () => {
    //   clearInterval(timeOut);
    // };
  }, []);

  const round = (num, n = 2) => {
    const factor = 10 ** n;
    return Math.floor(num * factor) / factor;
  };

  return (
    <div className="BlocksViewWrapper">
      <Header blockChain="eth" isShrink />
      <div className="BlocksViewWrapper__container">
        <TabularView
          type="Blocks"
          headers={[
            "Block",
            "Age",
            "Txn",
            "Uncles",
            "Miner",
            "Gas Used",
            "Gas Limit",
            "Base Fee",
            "Burnt Fee",
          ]}
          colWidth={["5%", "5%", "5%", "3%", "10%", "4%", "4%", "3%", "4%"]}
        >
          {blocksList.map((row, index) => {
            return (
              <tr
                key={index + row.sha3Uncles}
                className="TabularViewWrapper__table-row"
              >
                <td className="TabularViewWrapper__table-cell">
                  <a href={`/block/${row.blockNo}`}>{row.blockNo}</a>
                </td>
                <td className="TabularViewWrapper__table-cell">
                  {age(row.timestamp)}
                </td>
                <td className="TabularViewWrapper__table-cell">
                  <a href={`/tx/${row.blockNo}`}>{row.transactions.length}</a>
                </td>
                <td className="TabularViewWrapper__table-cell">
                  {row.uncles.length}
                </td>
                <td className="TabularViewWrapper__table-cell">
                  <a href={`/address/${row.miner}`}>
                    {web3.utils.toAscii(row.extraData)}
                  </a>
                </td>
                <td className="TabularViewWrapper__table-cell">
                  <div>
                    {Math.round((row.gasUsed / row.gasLimit) * 100)}%
                    <PercentBar
                      percent={Math.round((row.gasUsed / row.gasLimit) * 100)}
                    />
                  </div>
                </td>
                <td className="TabularViewWrapper__table-cell">
                  {row.gasLimit}
                </td>
                <td className="TabularViewWrapper__table-cell">
                  {round(
                    parseFloat(
                      web3.utils.fromWei(row.baseFeePerGas.toString(), "Gwei")
                    )
                  ) + " Gwei"}
                </td>
                <td className="TabularViewWrapper__table-cell">
                  {round(
                    parseFloat(
                      web3.utils.fromWei(
                        (row.baseFeePerGas * row.gasUsed).toString(),
                        "ether"
                      )
                    ),
                    6
                  )}
                </td>
              </tr>
            );
          })}
        </TabularView>
      </div>
    </div>
  );
}

export default BlocksView;
