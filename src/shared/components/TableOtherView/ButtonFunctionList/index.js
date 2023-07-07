import React from 'react';
import { Space } from 'antd';
import PropTypes from 'prop-types';
import ButtonCircle from '../../ButtonCircle';

const ButtonFunctionList = ({
  titleEdit,
  titleHistory,
  titleDelete,
  titleDownload,
  titleCopy,
  titleSign,
  onClickEdit,
  onClickHistory,
  onClickDelete,
  onClickDownload,
  onClickCopy,
  onClickSign,
}) => (
  <Space>
    {titleEdit && (
      <ButtonCircle
        title={titleEdit}
        iconname="edit"
        onClick={onClickEdit}
        enable
      />
    )}
    {titleSign && (
      <ButtonCircle
        title={titleSign}
        iconname="sign"
        onClick={onClickSign}
        enable
      />
    )}
    {titleCopy && (
      <ButtonCircle
        title={titleCopy}
        iconname="copy"
        onClick={onClickCopy}
        enable
      />
    )}
    {titleDownload && (
      <ButtonCircle
        title={titleDownload}
        iconname="download"
        onClick={onClickDownload}
        enable
      />
    )}
    {titleHistory && (
      <ButtonCircle
        title={titleHistory}
        iconname="history"
        onClick={onClickHistory}
        enable
      />
    )}
    {titleDelete && (
      <ButtonCircle
        title={titleDelete}
        iconname="delete"
        onClick={onClickDelete}
        enable
      />
    )}
  </Space>
);
ButtonFunctionList.propTypes = {
  titleEdit: PropTypes.string,
  titleHistory: PropTypes.string,
  titleDelete: PropTypes.string,
  titleDownload: PropTypes.string,
  titleCopy: PropTypes.string,
  titleSign: PropTypes.string,
  onClickEdit: PropTypes.func,
  onClickHistory: PropTypes.func,
  onClickDelete: PropTypes.func,
  onClickDownload: PropTypes.func,
  onClickCopy: PropTypes.func,
  onClickSign: PropTypes.func,
};

export default ButtonFunctionList;
