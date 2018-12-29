import { Link } from 'react-router-dom';
import React from 'react';

const Footer = props => (
  <footer className="page-footer">
    <div className="page-footer-col">
      <div className="page-footer-links">
        <Link role="Link" title="(MIT) License" to="/legal">Legal</Link>
        <Link role="Link" title="Terms and Conditions" to="/terms">
          Terms &amp; Conditions
        </Link>
        <Link role="Link" title="Privacy Policy" to="/privacy">Privacy</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
