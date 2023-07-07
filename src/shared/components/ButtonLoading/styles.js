import styled from 'styled-components'
import { Button } from 'antd'

const ButtonLoading = styled(Button)`
  &.ant-btn {
    width: 100%;
    height: 40px;
    align-items: center;
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 1.2857em;
    line-height: 25px;
    background: #ff6e01;
    color: white;
    border: 1px solid rgba(215, 215, 215, 0.75);
    box-sizing: border-box;
    border-radius: 8px;
    margin-top: 5px;
  }

  &.ant-btn:hover,
  &.ant-btn.ant-btn-loading,
  &.ant-btn:focus {
    border: 1px solid #ff6e01;
    background: #ff6e01;
    color: #000000;
  }
  &.ant-btn > .ant-btn-loading-icon .anticon svg {
    margin-top: -8px;
  }
`

export { ButtonLoading }
