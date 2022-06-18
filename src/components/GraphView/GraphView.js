import React from "react";
import PropTypes from "prop-types";
import "./GraphView.scss";
import ForceLayout from "react-d3-force-layout";

function GraphView({ data, setCurrentNode }) {
  return (
    <div className="GraphViewWrapper">
      <ForceLayout
        nodeLinkObject={data}
        nodeClicked={(d) => {
          setCurrentNode(d);
        }}
        colorFunction={(node) =>
          ({ 1: "red", 2: "green", 3: "purple" }[node.group])
        }
        // showLabelOnHover={{
        //   id: "ID-modified",
        //   group: "Type",
        // }}
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
