import React from "react";
import PropTypes from "prop-types";
import EthLogo from "../../Assets/EthLogo.png";
import EthText from "../../Assets/EthText.png";
import "./Header.scss";

function Header({ isShrink, blockChain }) {
  return (
    <div className={`HeaderWrapper ${isShrink ? "Shrink" : ""}`}>
      <div className="HeaderWrapper__left">
        {blockChain === "eth" && (
          <a href="/eth">
            <img
              className="HeaderWrapper__Logo--symbol"
              src={EthLogo}
              alt="EthLogo"
            />
            <img
              className="HeaderWrapper__Logo--text"
              src={EthText}
              alt="EthText"
            />
          </a>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  isShrink: PropTypes.bool,
  blockChain: PropTypes.string,
};
Header.defaultProps = {
  isShrink: false,
  blockChain: "eth",
};

export default Header;
