import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Header from "../../../components/Header/Header";
import PercentBar from "../../../components/PercentBar/PercentBar";
import TabularView from "../../../components/TabularView/TabularView";
import getColor from "../../../utils/PercentToColor";
import age from "../../../utils/UnixTimestamp";
import { getNBlocks, round } from "../../../utils/web3Helper";
import "./BlocksView.scss";

function BlocksView() {
  const [blocksList, setBlocksList] = useState([]);

  var provider = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`;
  var web3Provider = new Web3.providers.HttpProvider(provider);
  var web3 = new Web3(web3Provider);

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
            "🔥 Burnt Fee",
          ]}
          colWidth={["4%", "2.5%", "3%", "2%", "10%", "5%", "4%", "3%", "4%"]}
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
                  <a href={`/eth/transactions/${row.blockNo}`}>
                    {row.transactions.length}
                  </a>
                </td>
                <td className="TabularViewWrapper__table-cell">
                  {row.uncles.length}
                </td>
                <td className="TabularViewWrapper__table-cell">
                  <a href={`/eth/address/${row.miner}`}>
                    {web3.utils.toAscii(row.extraData)}
                  </a>
                </td>
                <td className="TabularViewWrapper__table-cell">
                  <div>
                    {Math.round((row.gasUsed / row.gasLimit) * 100)}%
                    <PercentBar
                      percent={Math.round((row.gasUsed / row.gasLimit) * 100)}
                      color={getColor(row.gasUsed / row.gasLimit)}
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
