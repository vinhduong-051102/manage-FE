import React, { useState } from 'react';
import { Select } from 'antd';
import Floating from '../Floatting';
import { SelectFloatStyle } from './style';
import iconArrowDropdown from '../../../../images/icon_arrow_dropdown.svg';

const { Option } = Select;

interface PropsType {
  allowClear?: boolean;
  dataSelect: any[];
  onChangeSelect: (value: any) => void;
  label: string;
  valueSelect?: string;
  isRequired?: boolean;
  disabled?: boolean;
}

const SelectFloat = ({
  allowClear,
  dataSelect,
  onChangeSelect,
  label,
  valueSelect,
  isRequired,
  disabled,
}: PropsType) => {
  const [selectValue, setSelectValue] = useState<any>(null);
  return (
    <Floating
      label={label}
      value={selectValue || valueSelect}
      isRequired={isRequired}
    >
      <SelectFloatStyle
        suffixIcon={<img alt="" src={iconArrowDropdown} />}
        onChange={(value) => {
          setSelectValue(value);
          onChangeSelect(value);
        }}
        value={valueSelect}
        allowClear={allowClear}
        disabled={disabled}
      >
        {dataSelect.map((item, index) => (
          <Option key={index} value={item.value}>
            {item.label}
          </Option>
        ))}
      </SelectFloatStyle>
    </Floating>
  );
};

export default SelectFloat;
