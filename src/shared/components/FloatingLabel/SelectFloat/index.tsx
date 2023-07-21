import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import Floating from '../Floatting';
import { SelectFloatStyle } from './style';
import iconArrowDropdown from '../../../../images/icon_arrow_dropdown.svg';

const { Option } = Select;

interface PropsType {
  allowClear?: boolean;
  dataSelect: {
    label: string;
    value: string;
  }[];
  onChangeSelect?: (value: any) => void;
  label: string;
  valueSelect?: string | null;
  isRequired?: boolean;
  disabled?: boolean;
  defaultValue?: string;
}

const SelectFloat = ({
  allowClear,
  dataSelect,
  onChangeSelect = () => {},
  label,
  valueSelect,
  isRequired,
  disabled,
  defaultValue,
}: PropsType) => {
  const [selectValue, setSelectValue] = useState<any>(null);
  useEffect(() => {
    setSelectValue(null);
  }, [dataSelect]);
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
        defaultValue={defaultValue}
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
