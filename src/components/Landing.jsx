import { withRouter } from 'react-router-dom';
import React from 'react';
import SvgSymbol from './Tools/SvgSymbol';

const Landing = props => (
  <div className="landing page-root">
    <section className="rocket">
      <div className="rocket-text">
        <p>Ignite</p>
        <p>your</p>
        <p>GIF</p>
        <p>game!!</p>
      </div>
      <div className="rocket-body">
        <SvgSymbol symbolId="#rocket-body" />
      </div>
      <div className="rocket-exhaust">
        <div className="rocket-exhaust-left">
          <SvgSymbol symbolId="#rocket-exhaust-left" />
        </div>
        <div className="rocket-exhaust-right">
          <SvgSymbol symbolId="#rocket-exhaust-right" />
        </div>
      </div>
      <div className="rocket-clouds">
        <div className="rocket-clouds-left">
          <SvgSymbol symbolId="#rocket-clouds-left" />
        </div>
        <div className="rocket-clouds-right">
          <SvgSymbol symbolId="#rocket-clouds-right" />
        </div>
      </div>
    </section>
  </div>
);

export default withRouter(Landing);
