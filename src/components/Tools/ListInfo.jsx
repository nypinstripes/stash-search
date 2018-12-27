import { number, object, string } from 'prop-types';
import React from 'react';

const ListInfo = props => (
  <div className="list-info" style={props.wellStyle}>
    <div className="list-info-container">
      <div className="list-info-left">
        <h3>{props.name}</h3>
      </div>
      <div className="list-info-right">
        <h6>{props.count} <span>GIFs</span></h6>
      </div>
    </div>
  </div>
);

ListInfo.propTypes = {
  count: number,
  name: string,
  wellStyle: object
};

export default ListInfo;
