import styled from 'styled-components'
import { Input } from 'antd'
const DivFloatLabel = styled.div`
  position: relative;
`

const InputText = styled(Input)`
  height: 40px;
  width: 100%;
  &.ant-input {
    outline: none;
    padding-left: 10px;
    font-size: 1em;
    font-style: normal;
    color: #212529;
    box-sizing: border-box;
  }
`
const InputPassword = styled(Input.Password)`
  height: 40px;
  width: 100%;
  &.ant-input {
    color: #212529;
    outline: none;
    padding-left: 10px;
    font-size: 1em;
    font-style: normal;
    box-sizing: border-box;
    align-items: center;
  }
  &.ant-input-affix-wrapper > input.ant-input:focus {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`

const Label = styled.label`
  position: absolute;
  pointer-events: none;
  left: 12px;
  top: 11px;
  transition: 0.2s ease all;
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.25);
`

const LabelPlaceholder = styled(Label)`
  z-index: 2;
  color: gray;
`
const LabelNormal = styled(Label)`
  z-index: 2;
  top: -8px;
  background: white;
  padding: 0 4px;
  margin-left: -4px;
  font-style: normal;
  font-weight: 400;
  font-size: 0.85714em;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.25);
`

export {
  DivFloatLabel,
  InputText,
  InputPassword,
  LabelPlaceholder,
  LabelNormal
}
