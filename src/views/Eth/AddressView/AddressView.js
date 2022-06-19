import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "./AddressView.scss";
import Tantum from "../../../utils/Tatum";
import GraphView from "../../../components/GraphView/GraphView";
import {
  getBalance,
  getStorageAt,
  getTransactionCount,
  round,
} from "../../../utils/web3Helper";
import Web3 from "web3";

function AddressView() {
  const { address } = useParams();
  const tantum = new Tantum();
  const [d3LinkedList, setD3LinkedList] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);

  const [nodeBalance, setNodeBalance] = useState(0);
  const [txnCount, setTxnCount] = useState(0);
  const [storage, setStorage] = useState("");

  const data = {
    nodes: nodes,
    links: d3LinkedList,
  };
  useEffect(() => {
    tantum.getTransactions(address, () => {}, setD3LinkedList, setNodes);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentNode) {
      getBalance(currentNode.id, setNodeBalance);
      getTransactionCount(currentNode.id, setTxnCount);
      getStorageAt(currentNode.id, 0, setStorage);
    }

    // cleanup
    return () => {
      setNodeBalance(0);
      setTxnCount(0);
      setStorage("");
    };
  }, [address, currentNode]);

  return (
    <div className="AddressViewWrapper MainWrapper">
      <Header blockChain="eth" isShrink />
      <div className="AddressViewWrapper__container">
        <div className="AddressViewWrapper__container__header">
          <h2>
            Trace <span>{address}</span>'s transactions
          </h2>
        </div>
        <div className="AddressViewWrapper__container__body">
          <div className="AddressViewWrapper__container__body--left">
            <div className="AddressViewWrapper__panel">
              {currentNode === null ? (
                <p className="AddressViewWrapper__panel--tempBox">
                  Click on a node to view Details
                </p>
              ) : (
                <div className="AddressViewWrapper__panel--data">
                  <div className="AddressViewWrapper__panel--data__header">
                    <h3>Address details</h3>
                    <hr />
                  </div>
                  <div className="AddressViewWrapper__panel--data__content">
                    <div className="AddressViewWrapper__panel--data__content__row">
                      <span className="label">Address:</span>
                      <span className="digits">
                        <span>{currentNode.id}</span>
                      </span>
                    </div>
                    <div className="AddressViewWrapper__panel--data__content__row">
                      <span className="label">Balance:</span>
                      <span className="digits">
                        {nodeBalance.ether}&nbsp;ETH
                      </span>
                    </div>
                    <div className="AddressViewWrapper__panel--data__content__row">
                      <span className="label">Transactions:</span>
                      <span className="digits">{txnCount}</span>
                    </div>

                    <div className="AddressViewWrapper__panel--data__content__row">
                      <span className="label">Storage:</span>
                      <span className="digits">
                        <span>{storage}</span>
                      </span>
                    </div>
                  </div>
                  <br />
                  <div className="AddressViewWrapper__panel--data__header">
                    <h3>Transaction details</h3>
                    <hr />
                  </div>
                  <div className="AddressViewWrapper__panel--data__content">
                    <div className="AddressViewWrapper__panel--data__content__row">
                      <span className="label">Txn Hash:</span>
                      <span className="digits">
                        <span>{d3LinkedList[currentNode.index].txnHash}</span>
                      </span>
                    </div>

                    <div className="AddressViewWrapper__panel--data__content__row">
                      <span className="label">Block Number:</span>
                      <span className="digits">
                        {d3LinkedList[currentNode.index].blockNumber}
                      </span>
                    </div>
                    <div className="AddressViewWrapper__panel--data__content__row">
                      <span className="label">Sent Value:</span>
                      <span className="digits">
                        {round(
                          Web3.utils.fromWei(
                            d3LinkedList[currentNode.index].sentAmt
                          ),
                          3
                        )}
                        &nbsp;ETH
                      </span>
                    </div>
                    <div className="AddressViewWrapper__panel--data__content__row">
                      <span className="label">Txn Fee:</span>
                      <span className="digits">
                        <span>
                          {Web3.utils.fromWei(
                            d3LinkedList[currentNode.index].gasPrice,
                            "ether"
                          ) * parseInt(d3LinkedList[currentNode.index].gas)}
                        </span>
                      </span>
                    </div>
                    <div className="AddressViewWrapper__panel--data__content__row">
                      <span className="label">Nonce:</span>
                      <span className="digits">
                        {d3LinkedList[currentNode.index].nonce}
                      </span>
                    </div>

                    <div className="AddressViewWrapper__panel--data__content__row">
                      <span className="label">Position:</span>
                      <span className="digits">
                        {d3LinkedList[currentNode.index].txnPosition}
                      </span>
                    </div>

                    <div className="AddressViewWrapper__panel--data__content__row">
                      <span className="label">Status:</span>
                      <span className="digits">
                        {`${d3LinkedList[currentNode.index].txnStatus}`}
                      </span>
                    </div>

                    <div className="AddressViewWrapper__panel--data__content__row">
                      <span className="label">Type:</span>
                      <span className="digits">
                        {d3LinkedList[currentNode.index].txnType}
                      </span>
                    </div>
                  </div>
                  <div className="AddressViewWrapper__panel--note">
                    Note: Displays only the first 50 transactions from the
                    address
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="AddressViewWrapper__container__body--right">
            <GraphView data={data} setCurrentNode={setCurrentNode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressView;
