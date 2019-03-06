import React from 'react';
import { Link } from "gatsby"
import classnames from 'classnames';

const partiallyActive = (className, activeClassName) => ({ isPartiallyCurrent }) => ({
  className: classnames(className, { [activeClassName]: isPartiallyCurrent }),
});

const PartialMatchLink = ({ className, activeClassName, ...rest }) => (
  <Link getProps={partiallyActive(className, activeClassName)} {...rest} />
);

export default PartialMatchLink;