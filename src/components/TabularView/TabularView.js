import React from "react";
import PropTypes from "prop-types";
import "./TabularView.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TabularView({
  type,
  headers,
  colWidth,
  children,
  viewMore,
  data,
  rowCount,
}) {
  return (
    <div className="TabularViewWrapper">
      <div className="TabularViewWrapper__header">
        <p className="TabularViewWrapper__title">{type}</p>
        {viewMore !== "" && <a href={viewMore}>View all</a>}
      </div>
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
          {data.length > 0 ? (
            children
          ) : (
            <>
              <tr>
                {headers.map((_, index) => {
                  return (
                    <td key={index} className="skeletonCol">
                      <Skeleton
                        style={{ width: "100%", marginBottom: "2px" }}
                        height={35}
                        count={rowCount}
                      />
                    </td>
                  );
                })}
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

TabularView.propTypes = {
  type: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string),
  colWidth: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
  viewMore: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  rowCount: PropTypes.number,
};
TabularView.defaultProps = {
  headers: [],
  colWidth: ["5%", "5%", "23%", "3%"],
  viewMore: "",
  data: [],
  rowCount: 1,
};

export default TabularView;
