import React from "react";
import PropTypes from "prop-types";
import "./DataCard.scss";

function DataCard({ style, title, children }) {
  return (
    <div className="DataCardWrapper" style={style}>
      <div className="DataCardWrapper__title">Block Height</div>
      <div className="DataCardWrapper__content">{children}</div>
    </div>
  );
}

DataCard.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.any,
};

DataCard.defaultProps = {
  style: {},
  title: "",
  children: "",
};

export default DataCard;
