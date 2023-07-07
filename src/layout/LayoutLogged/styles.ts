import styled from 'styled-components';
import { Layout } from 'antd';
const { Header, Content } = Layout;

export const LayoutCustom = styled(Layout)`
  height: 100%;
  min-height: 100%;

  .ant-layout {
    background-color: #eeeeee;
  }

  .ant-layout-content {
    @include scroll-page(8 px);
  }

  aside,
  .ant-layout-sider-children {
    height: 100%;
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #b2e9f8;
    color: #222d4b !important;
    font-weight: 600;

    .ant-menu-item-icon {
      svg path {
        fill: #626262;
      }
    }
  }

  & .ant-layout .ant-menu {
    // color: #a8b1bd;
    .ant-menu-item {
      height: 44px;
      display: flex;
      align-items: center;
      border-radius: 8px;
      margin-top: unset;
      column-gap: 8px;
    }

    .ant-menu-item-only-child {
      height: fit-content;
      border-radius: 8px;
      padding-left: unset !important;
      padding-right: unset;
      margin-bottom: unset;
      display: flex;
      justify-content: flex-end;
    }

    .ant-menu-sub {
      position: relative;

      .ant-menu-item-selected {
        background-color: transparent;
        color: #222d4b !important;
        font-weight: 600;

        & > div {
          background-color: #b2e9f8;
        }

        svg circle {
          fill: #626262 !important;
        }
      }
    }

    .ant-menu-submenu .ant-menu-submenu-title {
      display: flex;
      align-items: center;
      column-gap: 8px;

      .ant-menu-submenu-arrow {
        display: none;
      }
    }

    .side-bar-collapsed-selected[class*='ant-menu-submenu-selected'] .ant-menu-submenu-title {
      background-color: #b2e9f8;
    }

    .ant-menu-submenu-selected {
      .ant-menu-submenu-title {
        background-color: transparent;
        color: #222d4b;

        svg path {
          fill: #626262 !important;
        }
      }
    }

    .ant-menu-item-selected {
      color: #08b7dd;

      svg circle {
        fill: #08b7dd !important;
      }

      &::after {
        display: none;
      }
    }
  }
`;

export const HeaderCustom = styled(Header)`
  height: 64px !important;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px !important;
  border-bottom: 1px solid #ced4da;
`;

export const ContentCustom = styled(Content)`
  background: #ffffff;
  padding: 16px 20px;
  height: 100%;
  overflow-y: auto;
`;

export const LogoLayout = styled.div`
  display: flex;
  align-items: center;
  width: 228px;
  color: #626262;

  @media screen and (max-width: 1506px) {
    width: 230px;
  }
`;
export const AvatarHoverLayout = styled.div`
  width: 407px;
  padding: 8px;
`;
export const LogoIcon = styled.div`
  height: 22px;
  display: flex;
  width: 200px;

  &:hover {
    cursor: pointer;
  }
`;

export const SearchLayout = styled.div`
  margin-left: 40px;
`;
