import { Link } from 'react-router-dom';
import React from 'react';
import SvgSymbol from '../Tools/SvgSymbol';

const Header = () => (
  <header className="page-header">
    <div className="page-header-left">
      <Link className="page-header-logo" role="Link" title="Stashy" to="/">
        <div className="logo-pic">
          <div className="logo-pic-bg">
            <SvgSymbol symbolId="#logo-moon" />
            <SvgSymbol symbolId="#logo-sun" />
          </div>
          <div className="logo-pic-fg">
            <SvgSymbol symbolId="#logo-picture" />
          </div>
        </div>
        <div className="logo-text">
          <div className="logo-text-blobs">
            <SvgSymbol symbolId="#logo-blob-bottom" />
            <SvgSymbol symbolId="#logo-blob-top" />
          </div>
          <div className="logo-text-letters">
            <SvgSymbol symbolId="#logo-text" />
          </div>
        </div>
      </Link>
    </div>
    <div className="page-header-right">
      <Link className="page-header-favorite"
        role="Link"
        title="Favorites"
        to="/favorites"
      >
        <div className="page-header-favorite-icon">
          <SvgSymbol symbolId="#icon-favorite" />
        </div>
      </Link>
    </div>
  </header>
);

export default Header;
