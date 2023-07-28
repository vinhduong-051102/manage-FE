import styled from 'styled-components';
import { Descriptions } from 'antd';

export const DescriptionsStyled = styled(Descriptions)`
  th[class='ant-descriptions-item-label'] {
    background-color: ${(props) => props.theme.primaryColor} !important;
    color: ${(props) => props.theme.colors.white} !important;
    font-weight: bold !important;
  }

  .ant-descriptions-header {
    text-align: center !important;
  }
  .ant-descriptions-title {
    font-size: ${(props) => props.theme.fontSizes.extraLarge} !important;
  }
`;

export const IStyled = styled.i`
  font-weight: 400;
`;

export const TitleStyled = styled.h3``;

export const DescriptionDetailContainer = styled.div`
  width: calc(100% - 42px);
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
`;
