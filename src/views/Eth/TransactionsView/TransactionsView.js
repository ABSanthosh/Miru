import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Header from "../../../components/Header/Header";
import TabularView from "../../../components/TabularView/TabularView";
import { getNBlocks, round } from "../../../utils/web3Helper";
import "./TransactionsView.scss";

function TransactionsView() {
  const [blocksList, setBlocksList] = useState([]);
  const [transactionsList, setTransactionsList] = useState([]);

  useEffect(() => {
    getNBlocks(10, setBlocksList, setTransactionsList);
  }, []);

  return (
    <div className="TransactionsViewWrapper MainWrapper">
      <Header blockChain="eth" isShrink />
      <div className="TransactionsViewWrapper__container">
        <TabularView
          type="Transactions"
          headers={[
            "Txn Hash",
            "Block",
            "Type",
            "From",
            "",
            "To",
            "Value",
            "Txn Fee",
          ]}
          colWidth={["10%", "10%", "5%", "18%", "3%", "18%", "8%", "5%"]}
        >
          {transactionsList.splice(0, 100).map((row, index) => {
            return (
              <tr
                key={index + row.blockHash}
                className="TabularViewWrapper__table-row"
              >
                <td className="TabularViewWrapper__table-cell">{row.hash}</td>
                <td className="TabularViewWrapper__table-cell">
                  <a href={`/eth/block/${row.blockNumber}`}>{row.blockNumber}</a>
                </td>
                <td className="TabularViewWrapper__table-cell">{row.type}</td>

                <td className="TabularViewWrapper__table-cell">
                  <a href={`/eth/address/${row.from}`}>{row.from}</a>
                </td>
                <td className="TabularViewWrapper__table-cell">➜</td>
                <td className="TabularViewWrapper__table-cell">
                  <a href={`/eth/address/${row.to}`}>{row.to}</a>
                </td>
                <td className="TabularViewWrapper__table-cell">
                  {round(
                    parseFloat(Web3.utils.fromWei(`${row.value}`, "ether")),
                    3
                  )}{" "}
                  ETH
                </td>
                <td className="TabularViewWrapper__table-cell">
                  {round(
                    Web3.utils.fromWei(row.gasPrice, "ether") *
                      parseInt(row.gas),
                    5
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

export default TransactionsView;
