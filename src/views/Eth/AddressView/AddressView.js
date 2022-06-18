import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "./AddressView.scss";
import Tantum from "../../../utils/Tatum";
import GraphView from "../../../components/GraphView/GraphView";

function AddressView() {
  const { address } = useParams();
  const tantum = new Tantum();
  // eslint-disable-next-line no-unused-vars
  const [addressData, setAddressData] = useState([]);
  const [d3LinkedList, setD3LinkedList] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);

  const data = {
    nodes: nodes,
    links: d3LinkedList,
  };

  useEffect(() => {
    tantum.getTransactions(address, setAddressData, setD3LinkedList, setNodes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                <p>Click on a node to view Details</p>
              ) : (
                <p>{currentNode.id}</p>
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
