import React from "react";
import PropTypes from "prop-types";
import "./TabularView.scss";
import age from "../../utils/UnixTimestamp";

function TabularView({ type, headers, rows, colWidth }) {
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
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr
                key={index + row.sha3Uncles}
                className="TabularViewWrapper__table-row"
              >
                <td className="TabularViewWrapper__table-cell">
                  <a href={`/block/${row.blockNo}`}>{row.blockNo}</a>
                </td>
                <td className="TabularViewWrapper__table-cell">
                  {age(row.timestamp)}
                </td>
                <td className="TabularViewWrapper__table-cell">
                  <a href={`/address/${row.miner}`}>{row.miner}</a>
                </td>
                <td className="TabularViewWrapper__table-cell">
                  <a href={`/tx/${row.blockNo}`}>{row.transactions.length}</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

TabularView.propTypes = {
  type: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.arrayOf(PropTypes.object),
};
TabularView.defaultProps = {
  headers: [],
  rows: [],
};

export default TabularView;
