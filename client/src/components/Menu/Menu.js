import React from 'react';

const Menu = ({ children }) => {
  return (
    <nav role="navigation">
      <ul>{children}</ul>
    </nav>
  );
};

export default Menu;
