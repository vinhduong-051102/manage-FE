import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AvatarView,
  ButtonChangePasswordLayout,
  ButtonClose,
  ButtonEditAvatarLayout,
  ButtonLogoutLayout,
  ButtonUploadAvatar,
  Container,
  FullNameView,
  IconUploadView,
  ImgIconEditAvatar,
  TextButtonView,
  TitleView,
  UserNameView,
} from './style';
import defaultAvatar from '@/images/avatarDefault.svg';
import Button from '@/shared/components/Button';
import IconClose from '@/images/icon-close.svg';
import IconTakePhoto from '@/images/icon-camera.svg';
import IconEditAvatar from '@/images/icon-edit-avatar.svg';

interface PropsType {
  accountInfo: {
    email: string;
    fullName: string;
  };
  onClickSignOut: () => void;
  onClosePopover: () => void;
}

const InformationAccount = ({
  accountInfo,
  onClickSignOut,
  onClosePopover,
}: PropsType) => {
  const { t } = useTranslation();
  const [visibleEditAvatar, setVisibleEditAvatar] = useState(false);

  return (
    <Container>
      {visibleEditAvatar ? (
        <div>
          <TitleView>{t('common.imgAvatar')}</TitleView>
          <ButtonClose
            onClick={(e) => {
              e.stopPropagation();

              setVisibleEditAvatar(false);
            }}
          >
            <img alt="" src={IconClose} />
          </ButtonClose>
          <AvatarView style={{ marginTop: '47px' }}>
            <img width={118} height={116} alt="" src={defaultAvatar} />
          </AvatarView>
          <ButtonChangePasswordLayout style={{ marginTop: '67px' }}>
            <Button btntype="bg-white">
              <TextButtonView>{t('common.deleteAvatar')}</TextButtonView>
            </Button>
          </ButtonChangePasswordLayout>
          <ButtonLogoutLayout>
            <Button>
              <ButtonEditAvatarLayout>
                <span>{t('common.edit')}</span>
                <ImgIconEditAvatar src={IconEditAvatar} />
              </ButtonEditAvatarLayout>
            </Button>
          </ButtonLogoutLayout>
        </div>
      ) : (
        <div>
          <TitleView>{t('common.accountManagement')}</TitleView>
          <ButtonClose onClick={() => onClosePopover()}>
            <img alt="" src={IconClose} />
          </ButtonClose>
          <AvatarView onClick={() => setVisibleEditAvatar(true)}>
            <img width={118} height={116} alt="" src={defaultAvatar} />
            <ButtonUploadAvatar>
              <IconUploadView src={IconTakePhoto} />
            </ButtonUploadAvatar>
          </AvatarView>
          <UserNameView>{accountInfo.email}</UserNameView>
          <FullNameView>{accountInfo.fullName}</FullNameView>

          <ButtonLogoutLayout>
            <Button onClick={onClickSignOut}>
              <TextButtonView>{t('common.logout')}</TextButtonView>
            </Button>
          </ButtonLogoutLayout>
        </div>
      )}
    </Container>
  );
};

export default InformationAccount;
