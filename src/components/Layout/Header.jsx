import { Link } from 'react-router-dom';
import React from 'react';
import SvgIcon from '../Tools/SvgIcon';
import SvgSymbol from '../Tools/SvgSymbol';

const Header = () => (
  <header className="page-header">
    <div className="page-header-left">
      <Link to="/" className="page-header-logo">
        <SvgSymbol symbolId="#logo" />
      </Link>
    </div>
    <div className="page-header-right">
      <Link to="/favorites" className="page-header-favorite">
        <div className="page-header-favorite-icon">
          <SvgIcon name="favorite" />
        </div>
      </Link>
    </div>
  </header>
);

export default Header;
