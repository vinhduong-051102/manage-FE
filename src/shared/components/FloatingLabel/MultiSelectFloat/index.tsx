import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import Floating from '../Floatting';
import { SelectFloatStyle } from './style';

const { Option } = Select;

interface PropsType {
  allowClear?: boolean;
  dataSelect: {
    label: string;
    value: string;
  }[];
  onChangeSelect?: (value: string[]) => void;
  label: '';
  valueSelect?: string[];
  isRequired?: boolean;
  disabled?: boolean;
}

const MultiSelectFloat = ({
  allowClear,
  dataSelect,
  onChangeSelect,
  label,
  valueSelect = [],
  isRequired,
  disabled,
}: PropsType) => {
  const [selectValue, setSelectValue] = useState<string[]>([]);

  useEffect(() => {
    setSelectValue(valueSelect);
  }, [valueSelect]);

  return (
    <Floating
      label={label}
      value={selectValue.length || valueSelect.length}
      isRequired={isRequired}
    >
      <SelectFloatStyle
        mode="multiple"
        onChange={(value) => {
          if (Array.isArray(value)) {
            if (value.includes('all')) {
              setSelectValue(['all']);
              if (onChangeSelect) {
                onChangeSelect(['all']);
              }
            } else {
              setSelectValue(value);
              if (onChangeSelect) {
                onChangeSelect(value);
              }
            }
          }
        }}
        value={valueSelect}
        allowClear={allowClear}
        disabled={disabled}
      >
        {dataSelect.map((item, index) => (
          <Option
            key={index}
            disabled={valueSelect.includes('all') && item.value !== 'all'}
            value={item.value}
          >
            {item.label}
          </Option>
        ))}
      </SelectFloatStyle>
    </Floating>
  );
};

export default MultiSelectFloat;
