/* eslint react/forbid-prop-types: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import { withBoundingRects, withBoundingRectsProps } from '@vx/bounds';

import Tooltip from './Tooltip';

const propTypes = {
  ...withBoundingRectsProps,
  ...Tooltip.propTypes,
  offsetLeft: PropTypes.number,
  offsetTop: PropTypes.number,
};

const defaultProps = {};

function TooltipWithBounds({
  left: initialLeft,
  top: initialTop,
  offsetLeft = 10,
  offsetTop = 10,
  rect,
  parentRect,
  children,
  style,
  ...otherProps,
}) {
  let left = initialLeft;
  let top = initialTop;

  if (rect && parentRect) {
    left = ((offsetLeft + rect.right) > parentRect.right || (offsetLeft + rect.right) > window.innerWidth)
      ? (left - rect.width - offsetLeft) : left + offsetLeft;

    top = ((offsetTop + rect.bottom) > parentRect.bottom || (offsetTop + rect.bottom) > window.innerHeight)
      ? (top - rect.height - offsetTop) : top + offsetTop;
  }

  return (
    <Tooltip style={{ top: 0, transform: `translate(${left}px, ${top}px)`, ...style }} {...otherProps}>
      {children}
    </Tooltip>
  );
}

TooltipWithBounds.propTypes = propTypes;
TooltipWithBounds.defaultProps = defaultProps;

export default withBoundingRects(TooltipWithBounds);
