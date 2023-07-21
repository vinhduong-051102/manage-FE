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

export const StatusLabel = styled.div<{ active: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  color: ${(props) =>
    props.active
      ? props.theme.colors.status.active
      : props.theme.colors.status.inActive};
`;

export const FilterContainer = styled.div`
  width: 15%;
`;

export const TableContainer = styled.div<{ isFilterLeft: boolean }>`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  div:first-child {
    align-self: ${(props) => (props.isFilterLeft ? 'flex-start' : 'flex-end')};
  }
`;
