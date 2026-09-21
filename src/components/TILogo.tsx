import React from 'react';

interface TILogoProps {
  size?: number;
  variant?: 'dark' | 'light';
}

const TILogo: React.FC<TILogoProps> = ({ size = 36, variant = 'dark' }) => {
  const primary = variant === 'dark' ? '#1C1C1A' : '#EDE8DC';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tuning Ideas TI monogram"
    >
      <rect width="84" height="10" x="8" y="8" rx="2" fill={primary} />
      <rect width="14" height="72" x="8" y="18" rx="2" fill={primary} />
      <rect width="14" height="72" x="42" y="8" rx="2" fill={primary} />
      <rect width="10" height="60" x="60" y="14" rx="2" fill="#B87333" />
      <rect
        width="60"
        height="5"
        x="30"
        y="8"
        rx="1"
        fill="#A0522D"
        transform="rotate(48 30 8)"
      />
    </svg>
  );
};

export default TILogo;
