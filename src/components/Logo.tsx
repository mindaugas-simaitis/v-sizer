import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <img
      src='https://marketplace-web-assets.vinted.com/assets/web-logo/default/logo.svg'
      alt='Vinted'
      className={className}
      height='28'
    />
  );
};

export default Logo;
