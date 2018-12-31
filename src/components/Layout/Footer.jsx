import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import React from 'react';

const Footer = props => (
  <footer className="page-footer">
    <div className="page-footer-col">
      <div className="page-footer-links">
        <Link className={`page-footer-link ${props.page}-active`}
          id="footer-link-legal"
          role="Link"
          title="(MIT) License"
          to="/legal"
        >
          Legal
        </Link>
        <Link className={`page-footer-link ${props.page}-active`}
          id="footer-link-terms"
          role="Link"
          title="Terms and Conditions"
          to="/terms"
        >
          Terms &amp; Conditions
        </Link>
        <Link className={`page-footer-link ${props.page}-active`}
          id="footer-link-privacy"
          role="Link"
          title="Privacy Policy"
          to="/privacy"
        >
          Privacy
        </Link>
      </div>
    </div>
  </footer>
);

Footer.propTypes = { page: string };

export default Footer;
