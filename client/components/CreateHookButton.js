import React from 'react';

const CreateHookButton = ({ isActive, createHook }) => (
  <div className={`create-hook${isActive ? ' collapse' : ''}`}>
    <a onClick={isActive ? () => {} : createHook }>+</a>
  </div>
);

export default CreateHookButton;
