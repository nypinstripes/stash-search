import { number, object, string } from 'prop-types';
import React from 'react';

const ListInfo = props => (
  <h3 className="list-info"
    style={props.wellStyle}
    title={props.name === 'results' ? props.currentTerm : ''}
  >
    {props.count} {props.name}{props.name === 'results' ?
      ` for ${props.currentTerm}` : ''}
  </h3>
);

ListInfo.propTypes = {
  count: number,
  currentTerm: string,
  name: string,
  wellStyle: object
};

export default ListInfo;
