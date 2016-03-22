import React from 'react';

const Hook = ({ full_name }) => (
  <li className="hook-container">
      <span className="hook-action">o</span>
      <span className="repo-name">{ full_name }</span>
  </li>
);

export default Hook;
