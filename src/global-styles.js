import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    height: 100vh;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5em;
  }

  .ant-form-item-explain-error {
    margin-bottom: 0 !important;
    font-style: italic;
    font-size: 11px!important;
    padding-left: 8px!important;
    line-height: 14px!important;
    padding-top: 3px!important;
  }

  .notification-custom {
    .ant-notification-notice-content .ant-notification-notice-with-icon {
      display: flex;
      align-items: center;

      .ant-notification-notice-description {
        margin-left: 0;
      }
    }

    .ant-notification-notice-content {
      // height: 100%;
      display: flex;
      justify-content: center;
    }
    .ant-notification-notice-message {
      margin-bottom: 0;
      font-style: normal;
      font-weight: normal;
    }
    &.error {
      .ant-notification-notice-message {
        color: #e13f3d;
      }
    }
    &.success {
      .ant-notification-notice-message {
        color: #27ae60;
      }
    }
  }

  *::placeholder {
    color: ${(props) => props.theme.colors.placeholder} !important;
  }

  .ant-select-multiple .ant-select-selection-item {
    background: ${(props) => props.theme.colors.backgroundTagInput};
    border-radius: 6px;
    font-size: 14px;
  }

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: ${(props) => props.theme.colors.scrollbarColor};
  }

  .ant-tooltip {
    max-width: unset;
  }

  .ant-tooltip-content .ant-tooltip-inner {
    border-radius: 8px!important;
    box-shadow: 0 4px 12px rgb(0 0 0 / 25%);
    padding: 12px;
    background-color: #fff;
    color: rgba(0,0,0,.75);
  }

  .ant-tooltip-inner {
    max-height: 500px;
    overflow: hidden!important;
    -webkit-transform: translateZ(0);
  }

  .ant-tooltip-arrow {
    position: absolute;
    display: block;
    overflow: hidden;
    background: transparent;
    pointer-events: none;
  }

  .ant-tooltip-arrow-content {
    background-color: white;
    --antd-arrow-background-color: white;
  }

  .ant-radio-checked .ant-radio-inner {
    background-color: ${(props) => props.theme.colors.white};
    border-color: ${(props) => props.theme.primaryColor};

    ::after {
      background-color: ${(props) => props.theme.primaryColor};
    }
  }

`;

export const Container = styled.div`
  max-width: 100vw;
  padding: 40px 55px;
  margin-top: 80px;
  min-height: 100vh;
  @media only screen and (max-width: 768px) {
    padding: 32px 16px;
  }
`;

export default GlobalStyle;
