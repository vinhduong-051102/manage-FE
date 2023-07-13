import React from 'react';
import { StatusContainer, StatusLabel } from './styles';
import ButtonFunctionList from '../ButtonFunctionList';

interface PropsType {
  text: string;
  record: any;
  titleEdit?: string;
  titleCopy?: string;
  titleDownload?: string;
  titleHistory?: string;
  titleDelete?: string;
  onClickEdit?: () => void;
  onClickCopy?: () => void;
  onClickDownload?: () => void;
  onClickHistory?: () => void;
  onClickDelete?: () => void;
}

const TableFunction = ({
  text,
  record,
  titleEdit,
  titleCopy,
  titleDownload,
  titleHistory,
  titleDelete,
  onClickEdit,
  onClickCopy,
  onClickDownload,
  onClickHistory,
  onClickDelete,
}: PropsType) => (
  <>
    <StatusContainer>
      <StatusLabel active={record.isActive}>{text}</StatusLabel>
      <div className="listButton">
        <ButtonFunctionList
          titleEdit={titleEdit}
          titleCopy={titleCopy}
          titleDownload={titleDownload}
          titleHistory={titleHistory}
          titleDelete={titleDelete}
          onClickEdit={onClickEdit}
          onClickCopy={onClickCopy}
          onClickDownload={onClickDownload}
          onClickHistory={onClickHistory}
          onClickDelete={onClickDelete}
        />
      </div>
    </StatusContainer>
  </>
);

export default TableFunction;
