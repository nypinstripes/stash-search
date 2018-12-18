import { Link } from 'react-router-dom';
import React from 'react';
import SvgIcon from '../Tools/SvgIcon';
import SvgSymbol from '../Tools/SvgSymbol';

const Header = () => (
  <header className="header">
    <div className="header-left">
      <Link to="/" className="header-logo">
        <SvgSymbol symbolId="#logo" />
      </Link>
    </div>
    <div className="header-right">
      x
    </div>
  </header>
);

export default Header;
