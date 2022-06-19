import React from "react";
import PropTypes from "prop-types";
import "./GraphView.scss";
import ForceLayout from "react-d3-force-layout";

function GraphView({ data, setCurrentNode }) {
  return (
    <div className="GraphViewWrapper">
      <div className="GraphViewWrapper__legend">
        <div className="GraphViewWrapper__legend__item">
          <span className="GraphViewWrapper__legend__text">Sender</span>
          <span className="GraphViewWrapper__legend__circle purple" />
        </div>
        <div className="GraphViewWrapper__legend__item">
          <span className="GraphViewWrapper__legend__text">Receiver</span>
          <span className="GraphViewWrapper__legend__circle green" />
        </div>
      </div>
      <ForceLayout
        nodeLinkObject={data}
        nodeClicked={(d) => {
          setCurrentNode(d);
        }}
        colorFunction={(node) =>
          ({ 1: "#33f462", 2: "#f431f4", 3: "purple" }[node.group])
        }
        showLabelOnHover={{
          id: "ID-modified",
          group: "Type",
        }}
        // connectionStrength={0.01}
        fillType="White"
      />
    </div>
  );
}

GraphView.propTypes = {
  data: PropTypes.object.isRequired,
  setCurrentNode: PropTypes.func.isRequired,
};

GraphView.defaultProps = {};

export default GraphView;
