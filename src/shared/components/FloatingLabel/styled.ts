import styled from 'styled-components';
import { Input, InputNumber } from 'antd';
export const TreeSelectWrapper = styled.div<{
  isAll: boolean;
  isFocus: boolean;
  bgColor: string;
}>`
  .ant-select-selection-item-remove {
    display: ${(props) => (props.isAll ? 'none !important' : 'flex')};
  }
  .ant-select {
    border-radius: 8px;
    background-color: ${(props) =>
      props.isFocus ? '#fff !important' : 'transparent'};
  }
  label {
    background-color: ${(props) => props.bgColor || '#fff'} !important;
  }
`;

export const FlWrapper = styled.div<{
  disabled?: boolean;
  checkPropsPL?: boolean;
}>`
  position: relative;
  background: transparent;
  border-radius: 8px;
  &:hover {
    .fl-label {
      /* color: var(--color-primary); */
    }
  }
  input {
    z-index: 3;
    background-color: ${(props) =>
      props.disabled ? '#f5f5f5' : '#fff !important'};
  }
  .ant-select {
    z-index: 3;
    background-color: ${(props) =>
      props.disabled ? '#f5f5f5' : '#fff !important'};
  }
  .ant-select-selector {
    background-color: transparent !important;
  }

  .ant-input-number {
    z-index: 3;
    background-color: transparent !important;
  }
  .ant-select-selection-search-input {
    height: 100% !important;
  }
  .ant-select-selection-search {
    margin-left: 10px;
    width: 100%;
    right: 0 !important;
    left: 0 !important;
  }

  .ant-input-affix-wrapper {
    border: ${(props) =>
      !props.checkPropsPL
        ? undefined
        : props.placeholder
        ? '1px solid #868e96'
        : '1px solid #c5ced9'};
    background: transparent;
    :hover {
      background: transparent;
    }
  }

  .ant-picker {
    padding: 0;
    input {
      height: 100%;
      padding: 9.5px 11px;
      width: 100%;
    }
    .ant-picker-suffix {
      position: absolute;
      right: 10px;
    }
    .ant-picker-clear {
      right: 10px;
      z-index: 4;
    }
  }

  .fieldWrapper {
    display: block;
    position: relative;
    border-radius: 8px;

    .formControl {
      height: 40px;
      display: flex;
      width: 100%;
      line-height: 1.25;
      color: #222d4b;
      background-image: none;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      border-radius: 8px;
      z-index: 2;
      font-size: 14px;
      box-shadow: none !important;

      &:focus {
        color: #222d4b;
        border-color: #1574f6;
        outline: 0;
        background-color: #fff !important;
      }

      &:placeholder-shown:not(:focus) + * {
        font-size: 14px;
        line-height: 19px;
        color: #868e96 !important;
        top: 0.75em;
        z-index: 3;
      }

      &:focus + label {
        color: #1574f6;
        z-index: 3;
      }

      &:hover + label {
        color: #1574f6;
        z-index: 3;
      }
    }

    label {
      position: absolute;
      cursor: text;
      font-size: 12px;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
      top: -0.4em;
      left: 0.75rem;
      z-index: 3;
      line-height: 10px;
      padding: 0 1px;
      color: #222d4b;
      background-color: #ffffff;

      .redStar {
        color: red;
        margin-left: 5px;
      }

      &::after {
        content: ' ';
        display: block;
        position: absolute;
        height: 4px;
        top: 50%;
        left: -0.1em;
        right: -0.2em;
        z-index: -1;
      }
    }
  }
`;

export const Label = styled.span<{ isFl?: boolean; bgColor?: string }>`
  position: absolute;
  cursor: text;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  top: ${(props) => (props.isFl ? '-7px' : '38%')};
  font-size: ${(props) => (props.isFl ? '12px' : '14px')};
  color: ${(props) => (props.isFl ? '#000' : '#868e96')};
  z-index: ${(props) => (props.isFl ? 3 : 1)};
  font-weight: normal;
  left: 10.8px;
  line-height: 10px;
  padding: 0 1px;
  background-color: transparent;
  &:focus {
    color: #1574f6;
  }
  .redStar {
    color: red;
    margin-left: 5px;
  }
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    background-color: white; //${(props) => props.bgColor || 'transparent'};
    height: 5px;
    top: 40%;
    left: -0.1em;
    right: -0.2em;
    z-index: -1;
  }
`;

export const RedStar = styled.span`
  color: red;
  margin-left: 5px;
`;

const inputStyle = `
  height: 40px;
  display: flex;
  width: 100%;
  line-height: 1.25;
  color: #222d4b;
  background-image: none;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border-radius: 8px;
  z-index: 2;
  font-size: 14px;
  box-shadow: none !important;

  &:focus {
    color: #222d4b;
    border-color: #1574f6;
    outline: 0;
    background-color: #fff !important;
  }

  &:placeholder-shown:not(:focus) + * {
    font-size: 14px;
    line-height: 19px;
    color: #868e96 !important;
    top: 0.75em;
    z-index: 3;
  }

  :has(input:placeholder-shown:not(:focus)) + span {
    font-size: 14px;
    line-height: 19px;
    color: #868e96 !important;
    top: 0.75em;
    z-index: 3;
  }

  &:focus + label {
    color: #1574f6;
    z-index: 3;
  }

  &:hover + label {
    color: #1574f6;
    z-index: 3;
  }
`;

export const InputCustom = styled(Input)`
  ${inputStyle}
`;

export const InputNumberCustom = styled(InputNumber)`
  height: 40px;
  display: flex;
  width: 100%;
  line-height: 1.25;
  color: #222d4b;
  background-image: none;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border-radius: 8px;
  z-index: 2;
  font-size: 14px;
  box-shadow: none !important;

  &:focus {
    color: #222d4b;
    border-color: #1574f6;
    outline: 0;
    background-color: #fff !important;
  }

  &:placeholder-shown:not(:focus) + * {
    font-size: 14px;
    line-height: 19px;
    color: #868e96 !important;
    top: 0.75em;
    z-index: 3;
  }

  :has(input:placeholder-shown:not(:focus)) + span {
    font-size: 14px;
    line-height: 19px;
    color: #868e96 !important;
    top: 0.75em;
    z-index: 3;
  }

  &:focus + label {
    color: #1574f6;
    z-index: 3;
  }

  &:hover + label {
    color: #1574f6;
    z-index: 3;
  }

  .ant-input-number-input-wrap {
    width: 100%;
    height: 100%;

    input {
      height: 100%;
      border-radius: 8px 0 0 8px;
    }
  }

  .ant-input-number-handler-wrap {
    border-radius: 0;
  }

  .ant-input-number-group-addon:last-child {
    border-radius: 0 8px 8px 0;
    background: white;
  }
`;

export const InputTextAreaCustom = styled(InputCustom.TextArea)`
  ${inputStyle}
`;

export const InputPasswordCustom = styled(InputCustom.Password)`
  ${inputStyle}
`;
