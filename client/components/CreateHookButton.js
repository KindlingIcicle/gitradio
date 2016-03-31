import React from 'react';

const CreateHookButton = ({ isActive }) => (
  <div className={`create-hook${isActive ? ' collapse' : ''}`}>
    <a>+</a>
  </div>
);

export default CreateHookButton;
