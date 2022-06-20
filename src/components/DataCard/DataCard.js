import React from "react";
import PropTypes from "prop-types";
import "./DataCard.scss";

function DataCard({ style, title, children, className, toolTip }) {
  return (
    <div className={`DataCardWrapper ${className}`} style={style}>
      <span className="DataCardWrapper__help"></span>
      <span className="DataCardWrapper__toolTip">
        <p>{toolTip}</p>
      </span>
      <div className="DataCardWrapper__title">{title}</div>
      <div className="DataCardWrapper__content">{children}</div>
    </div>
  );
}

DataCard.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  toolTip: PropTypes.string,
};

DataCard.defaultProps = {
  style: {},
  title: "",
  children: "",
  className: "",
  toolTip: "",
};

export default DataCard;
