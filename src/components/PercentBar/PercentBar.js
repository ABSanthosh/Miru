import React from "react";
import PropTypes from "prop-types";
import "./PercentBar.scss";

function PercentBar({ percent, color }) {
  return (
    <div className="PercentBarWrapper">
      <div
        className="PercentBarWrapper__bar"
        style={{ width: `${percent}%`, backgroundColor: color }}
      />
    </div>
  );
}

PercentBar.propTypes = {
  percent: PropTypes.number.isRequired,
  color: PropTypes.string,
};

PercentBar.defaultProps = {
  color: "cornflowerblue",
};

export default PercentBar;
