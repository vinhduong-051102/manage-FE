import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { DivFloatLabel, InputText, InputPassword, LabelNormal } from './styles';

interface PropsType {
  label: string;
  defaultValue?: string;
  type?: 'password' | 'default';
  error: boolean;
  onChange: (value: string) => void;
  onEnter?: () => void;
}

const InputLogin = ({
  label,
  defaultValue,
  type = 'default',
  error,
  onChange,
  onEnter,
}: PropsType) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState('');
  const isOccupied = focus || (value && value.length !== 0);

  setTimeout(() => {
    const autofilled = document.querySelectorAll('input:-webkit-autofill');
    if (autofilled.length > 0) setFocus(true);
  }, 500);

  useEffect(() => {
    onChange(value);
  }, [value]);

  const handleKeyPress: (event: React.KeyboardEvent) => void = (event) => {
    if (event.key === 'Enter') {
      if (onEnter) {
        onEnter();
      }
    }
  };

  return (
    <DivFloatLabel
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {type === 'password' ? (
        <InputPassword
          onKeyPress={handleKeyPress}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          defaultValue={defaultValue}
          placeholder={label}
          style={{
            borderRadius: '8px',
          }}
          status={error ? 'error' : undefined}
          iconRender={(visible) =>
            visible ? (
              <div>
                <Tooltip mouseLeaveDelay={0} title="Ẩn mật khẩu">
                  <EyeTwoTone />
                </Tooltip>
              </div>
            ) : (
              <div>
                <Tooltip mouseLeaveDelay={0} title="Hiển thị mật khẩu">
                  <EyeInvisibleOutlined />
                </Tooltip>
              </div>
            )
          }
        />
      ) : (
        <InputText
          onChange={(e) => setValue(e.target.value)}
          type={type}
          defaultValue={defaultValue}
          placeholder={label}
          style={{
            borderRadius: '8px',
          }}
          status={error ? 'error' : undefined}
        />
      )}
      {isOccupied ? <LabelNormal> {label}</LabelNormal> : null}
    </DivFloatLabel>
  );
};

export default InputLogin;
