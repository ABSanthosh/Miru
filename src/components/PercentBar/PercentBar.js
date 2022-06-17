import React from "react";
import PropTypes from "prop-types";
import "./PercentBar.scss";

function PercentBar({ percent }) {
  return (
    <div className="PercentBarWrapper">
      <div
        className="PercentBarWrapper__bar"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

PercentBar.propTypes = {
  percent: PropTypes.number.isRequired,
};

export default PercentBar;
