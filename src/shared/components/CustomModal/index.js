import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';
import {
  ButtonSave,
  DivFooter,
  ModalTitle,
  ModalWrapper,
  StyleButtonClose,
} from './styled';

export default function CustomModal({
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
  isSaveIsReset,
  isLoading,
  onSave,
  onSaveAndReset,
  isModalInformation,
}) {
  const { t } = useTranslation();

  const onKeyDownListener = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClickCancel(false);
    }
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      onSave();
    }
    if (e.ctrlKey && e.key === 'd') {
      e.preventDefault();
      onSaveAndReset();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDownListener);
    return () => {
      document.removeEventListener('keydown', onKeyDownListener);
    };
  });

  return (
    <ModalWrapper
      destroyOnClose
      centered
      closable
      maskClosable={false}
      width={width || 1180}
      visible
      onCancel={onClickCancel}
      onOk={onSave}
      footer={[
        <DivFooter>
          {isModalInformation ? (
            <>
              <StyleButtonClose onClick={onClickCancel}>
                <div>{nameCancel || t('common.closeModal')}</div>
              </StyleButtonClose>
            </>
          ) : (
            <>
              {isCustomFooter ? (
                <div>{buttonCustom}</div>
              ) : (
                <DivFooter>
                  <StyleButtonClose onClick={onClickCancel}>
                    <div>{nameCancel || t('common.closeModal')}</div>
                  </StyleButtonClose>
                  {isSaveIsReset &&
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
                  {!disableSaveButton ? (
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
                  )}
                </DivFooter>
              )}
            </>
          )}
        </DivFooter>,
      ]}
    >
      <ModalTitle>{title}</ModalTitle>
      {children}
    </ModalWrapper>
  );
}

CustomModal.propTypes = {
  disableSaveButton: PropTypes.bool,
  children: PropTypes.any,
  width: PropTypes.number,
  onClickCancel: PropTypes.func,
  isCustomFooter: PropTypes.bool,
  buttonCustom: PropTypes.any,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  nameCancel: PropTypes.string,
  nameSave: PropTypes.string,
  nameSaveAndReset: PropTypes.string,
  isSaveIsReset: PropTypes.bool,
  onSave: PropTypes.func,
  onSaveAndReset: PropTypes.func,
  isModalInformation: PropTypes.bool,
  disableSaveMessage: PropTypes.string,
};
