import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

import Button from '../Button';

ButtonCircle.propTypes = {
  title: PropTypes.string,
  iconname: PropTypes.string,
  enable: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  clsname: PropTypes.string,
  placement: PropTypes.string,
  btntype: PropTypes.string,
};

ButtonCircle.defaultProps = {
  placement: 'bottomRight',
  btntype: 'btn-circle',
};

export default function ButtonCircle(props) {
  const {
    title,
    iconname,
    enable,
    onClick,
    className,
    clsname,
    placement,
    btntype,
  } = props;

  return (
    <Tooltip
      placement={placement}
      mouseLeaveDelay={0}
      title={title}
      overlayStyle={{ maxWidth: 500 }}
    >
      <div>
        <Button
          btntype={btntype}
          shape="circle"
          iconname={iconname}
          className={className}
          clsname={clsname}
          disabled={!enable}
          onClick={(e) => {
            e.stopPropagation();
            // eslint-disable-next-line no-unused-expressions
            !!onClick && onClick();
          }}
        />
      </div>
    </Tooltip>
  );
}
