import React from 'react';

interface Props extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
}

/** Hash-route link. `to` looks like "/digital/about". Scroll-to-top is handled in App on route change. */
const Link: React.FC<Props> = ({ to, children, ...rest }) => (
  <a href={`#${to}`} {...rest}>
    {children}
  </a>
);

export default Link;
