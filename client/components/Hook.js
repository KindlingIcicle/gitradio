import React from 'react';

const Hook = ({ children, name, owner }) => (
  <li className="hook-container">
      <span className="hook-action">o</span>
      <span className="repo-name">{owner} / {name}</span>
      {children}
  </li>
);

export default Hook;
