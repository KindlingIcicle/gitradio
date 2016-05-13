import React from 'react';
import Hook from '../containers/Hook';

const HookList = ({ onHookClick, repos }) => (
  <div className="hook-list-container">
    <ul>
      {repos.map(hook =>
        <Hook key={hook.id}
          {...hook}
          onHookClick={onHookClick}
        />
      )}
    </ul>
  </div>
);

export default HookList;
