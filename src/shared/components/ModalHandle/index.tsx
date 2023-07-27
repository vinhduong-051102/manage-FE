import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';
import {
  ButtonSave,
  DivFooter,
  ModalTitle,
  ModalWrapper,
  StyleButtonClose,
} from './styled';

interface PropsType {
  disableSaveButton?: boolean;
  children: ReactElement;
  width?: number;
  onClickCancel: () => void;
  isCustomFooter?: boolean;
  buttonCustom?: ReactElement;
  title: string;
  isLoading?: boolean;
  nameCancel?: string;
  nameSave?: string;
  nameSaveAndReset?: string;
  isSaveAndReset?: boolean;
  onSave?: () => void;
  onSaveAndReset?: () => {};
  isModalInformation?: boolean;
  disableSaveMessage?: string;
  contextHolder?: () => void;
  levelModal?: number;
  isLeftButton?: boolean;
  onClickLeftButton?: () => void;
  nameLeftButton?: string | ReactElement;
  visible: boolean;
  isShowSaveButton?: boolean;
  forceRender?: boolean;
}

export default function ModalHandle({
  contextHolder,
  disableSaveMessage,
  disableSaveButton,
  children,
  width,
  onClickCancel,
  isCustomFooter,
  buttonCustom,
  title,
  nameCancel,
  nameSave,
  nameSaveAndReset,
  isSaveAndReset,
  isLoading,
  onSave,
  onSaveAndReset,
  isModalInformation,
  levelModal,
  visible,
  isLeftButton,
  onClickLeftButton,
  nameLeftButton,
  isShowSaveButton = true,
  forceRender = false,
}: PropsType) {
  const { t } = useTranslation();
  const onKeyDownListener = (e: KeyboardEvent) => {
    localStorage.setItem('checkDESC', '1');
    if (e.key === 'Escape') {
      e.preventDefault();
      const arrayClose = document.getElementsByClassName(
        'ant-modal-close',
      ) as unknown as HTMLElement[];
      if (localStorage.getItem('checkDESC') !== '0') {
        if (arrayClose && arrayClose.length > 0) {
          arrayClose[arrayClose.length - 1].click();
        }
      } else {
        console.log(levelModal);
      }
      // onClickCancel();
    }
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      onSave && onSave();
    }
    if (e.ctrlKey && e.key === 'd') {
      e.preventDefault();
      onSaveAndReset && onSaveAndReset();
    }
  };

  const Footer = (
    <>
      {isModalInformation ? (
        <DivFooter>
          <ButtonSave onClick={onClickCancel}>
            <div>{nameCancel || t('common.closeModal')}</div>
          </ButtonSave>
        </DivFooter>
      ) : (
        <>
          {isCustomFooter ? (
            <div>{buttonCustom}</div>
          ) : (
            <div
              style={
                isLeftButton
                  ? { display: 'flex', justifyContent: 'space-between' }
                  : {}
              }
            >
              {isLeftButton && (
                <StyleButtonClose
                  loading={isLoading}
                  onClick={onClickLeftButton}
                >
                  <div>{nameLeftButton}</div>
                </StyleButtonClose>
              )}
              <DivFooter
                style={isLeftButton ? { justifyContent: 'flex-end' } : {}}
              >
                <>
                  <StyleButtonClose onClick={onClickCancel}>
                    <div>{nameCancel || t('common.closeModal')}</div>
                  </StyleButtonClose>
                  {contextHolder}
                  {isSaveAndReset &&
                    (!disableSaveButton ? (
                      <ButtonSave loading={isLoading} onClick={onSaveAndReset}>
                        {nameSaveAndReset || t('common.saveAndNext')}
                      </ButtonSave>
                    ) : (
                      <Tooltip title={disableSaveMessage}>
                        <div>
                          <ButtonSave loading={isLoading} disable>
                            {nameSaveAndReset || t('common.saveAndNext')}
                          </ButtonSave>
                        </div>
                      </Tooltip>
                    ))}
                  {isShowSaveButton &&
                    (!disableSaveButton ? (
                      <ButtonSave loading={isLoading} onClick={onSave}>
                        {nameSave || t('common.saveModal')}
                      </ButtonSave>
                    ) : (
                      <Tooltip title={disableSaveMessage}>
                        <div>
                          <ButtonSave loading={isLoading} disable>
                            {nameSave || t('common.saveModal')}
                          </ButtonSave>
                        </div>
                      </Tooltip>
                    ))}
                </>
              </DivFooter>
            </div>
          )}
        </>
      )}
    </>
  );

  useEffect(() => {
    localStorage.setItem('checkDESC', '0');
    document.addEventListener('keydown', onKeyDownListener);
    return () => {
      document.removeEventListener('keydown', onKeyDownListener);
    };
  });
  return (
    <ModalWrapper
      forceRender={forceRender}
      destroyOnClose
      centered
      closable
      maskClosable={false}
      width={width || 1180}
      open={visible}
      onCancel={onClickCancel}
      onOk={onSave}
      footer={Footer}
    >
      <ModalTitle>{title}</ModalTitle>
      {children}
    </ModalWrapper>
  );
}
