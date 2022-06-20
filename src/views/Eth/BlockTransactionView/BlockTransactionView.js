import React, { useEffect, useState } from "react";
import "./BlockTransactionView.scss";
import Header from "../../../components/Header/Header";
import { useParams } from "react-router-dom";
import { getBlock } from "../../../utils/web3Helper";
import TabularView from "../../../components/TabularView/TabularView";
import age from "../../../utils/UnixTimestamp";
import Web3 from "web3";

function BlockTransactionView() {
  const { blockNumber } = useParams();
  const [txns, setTxns] = useState([]);
  const [blockData, setBlockData] = useState({});

  useEffect(() => {
    getBlock(blockNumber, setBlockData, setTxns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="BlockTransactionViewWrapper MainWrapper">
      <Header blockChain="eth" isShrink />
      <div className="BlockTransactionViewWrapper__container">
        <TabularView
          type={`Txn of Block #${blockNumber}`}
          headers={[
            "Txn Hash",
            "Block",
            "Age",
            "From",
            "",
            "To",
            "Value",
            "Txn Fee",
          ]}
          colWidth={["4%", "4%", "4%", "7%", "2%", "7%", "5%", "3%"]}
          data={txns}
          rowCount={100}
        >
          {txns.map((row, index) => {
            return (
              <tr key={index} className="TabularViewWrapper__table-row">
                <td className="TabularViewWrapper__table-cell">{row.hash}</td>
                <td className="TabularViewWrapper__table-cell">
                  <a href={`/eth/block/${row.blockNumber}`}>
                    {row.blockNumber}
                  </a>
                </td>
                <td className="TabularViewWrapper__table-cell">
                  {age(blockData.timestamp) + " ago"}
                </td>
                <td className="TabularViewWrapper__table-cell">
                  <a href={`/eth/address/${row.from}`}>{row.from}</a>
                </td>
                <td className="TabularViewWrapper__table-cell">➜</td>
                <td className="TabularViewWrapper__table-cell">
                  <a href={`/eth/address/${row.to}`}>{row.to}</a>
                </td>
                <td className="TabularViewWrapper__table-cell">
                  {parseFloat(Web3.utils.fromWei(row.value, "ether")).toFixed(
                    4
                  ) + " Ether"}
                </td>
                <td className="TabularViewWrapper__table-cell">
                  {Web3.utils.fromWei(row.gasPrice, "ether") *
                    parseInt(row.gas)}
                </td>
              </tr>
            );
          })}
        </TabularView>
      </div>
    </div>
  );
}

export default BlockTransactionView;
