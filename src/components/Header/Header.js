import React from "react";
import PropTypes from "prop-types";
import EthLogo from "../../Assets/EthLogo.png";
import EthText from "../../Assets/EthText.png";
import "./Header.scss";

function Header({ isShrink }) {
  return (
    <div className={`HeaderWrapper ${isShrink ? "Shrink" : ""}`}>
      <div className="HeaderWrapper__left">
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
      </div>
    </div>
  );
}

Header.propTypes = {
  isShrink: PropTypes.bool,
};
Header.defaultProps = {
  isShrink: false,
};

export default Header;
