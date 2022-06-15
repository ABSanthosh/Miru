import React from "react";
import PropTypes from "prop-types";
import "./TabularView.scss";

function TabularView({ type, headers, rows, colWidth, children }) {
  return (
    <div className="TabularViewWrapper">
      <p className="TabularViewWrapper__title">{type}</p>
      <table className="TabularViewWrapper__table">
        <colgroup>
          {colWidth.map((width, index) => (
            <col key={index} style={{ width }} />
          ))}
        </colgroup>
        <thead className="TabularViewWrapper__table-head">
          <tr className="TabularViewWrapper__table-row">
            {headers.map((header, index) => (
              <th key={index} className="TabularViewWrapper__table-headCell">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

TabularView.propTypes = {
  type: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.arrayOf(PropTypes.object),
  colWidth: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};
TabularView.defaultProps = {
  headers: [],
  rows: [],
  colWidth: ["5%", "5%", "23%", "3%"],
};

export default TabularView;
