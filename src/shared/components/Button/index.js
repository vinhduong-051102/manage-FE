import React from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import {
  ButtonCircleCustom,
  ButtonCustom,
  ButtonCustomGray,
  ButtonCustomWhite,
  ButtonFilterCustom,
} from './styles';
import SvgIcon from '../../../images/SvgIcon';

const Button = (props) => {
  const dataProps = { ...props };
  const {
    iconname,
    children,
    btntype = '',
    // className,
    // clsName,
    size,
    // minWidthDefault,
    disabled,
    onClick,
    allowDisabled,
    // styleIcon,
    color,
  } = props;
  // delete dataProps.btntype;
  delete dataProps.className;
  // delete dataProps.clsName;
  // delete dataProps.iconname;
  delete dataProps.size;
  // delete dataProps.minWidthDefault;
  delete dataProps.disabled;
  delete dataProps.onClick;
  delete dataProps.allowDisabled;
  if (btntype === 'btn-circle')
    return (
      <ButtonCircleCustom
        color={color}
        size={size}
        onClick={!disabled && onClick}
        disabled={allowDisabled}
        {...dataProps}
      >
        {!isEmpty(iconname) && <SvgIcon name={iconname} />}
        {!isEmpty(children) && <span>{children}</span>}
      </ButtonCircleCustom>
    );

  if (btntype === 'filter')
    return (
      <ButtonFilterCustom
        color={color}
        size={size}
        onClick={!disabled && onClick}
        disabled={allowDisabled}
        {...dataProps}
      >
        {!isEmpty(iconname) && <SvgIcon name={iconname} />}
        {!isEmpty(children) && <span>{children}</span>}
      </ButtonFilterCustom>
    );
  if (btntype === 'bg-white')
    return (
      <ButtonCustomWhite
        color={color}
        size={size}
        onClick={!disabled && onClick}
        disabled={allowDisabled}
        {...dataProps}
      >
        {!isEmpty(iconname) && <SvgIcon name={iconname} />}
        {!isEmpty(children) && <span>{children}</span>}
      </ButtonCustomWhite>
    );
  if (btntype === 'gray')
    return (
      <ButtonCustomGray
        type="primary"
        color={color}
        size={size}
        onClick={!disabled && onClick}
        disabled={allowDisabled}
        {...dataProps}
      >
        {!isEmpty(iconname) && <SvgIcon name={iconname} />}
        {!isEmpty(children) && <span>{children}</span>}
      </ButtonCustomGray>
    );
  return (
    <ButtonCustom
      type="primary"
      color={color}
      size={size}
      onClick={!disabled && onClick}
      disabled={allowDisabled}
      {...dataProps}
    >
      {!isEmpty(iconname) && <SvgIcon name={iconname} />}
      {!isEmpty(children) && <span>{children}</span>}
    </ButtonCustom>
  );
};
Button.propTypes = {
  iconname: PropTypes.string,
  children: PropTypes.node,
  btntype: PropTypes.string,
  size: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  allowDisabled: PropTypes.bool,
  color: PropTypes.string,
};

export default Button;
