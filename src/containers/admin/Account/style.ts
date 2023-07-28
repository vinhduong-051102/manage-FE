import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 362px;
  height: 407px;
`;

export const Container = styled(Wrapper)`
  display: flex;
  flex-direction: column;
`;
export const TitleView = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  color: ${(props) => props.theme.primaryColor};
`;
export const ButtonClose = styled.div`
  position: absolute;
  top: 13px;
  right: 23px;
`;
export const ButtonUploadAvatar = styled.div`
  position: relative;
`;

export const IconUploadView = styled.img`
  position: absolute;
  bottom: 10px;
  right: -18px;
`;
export const AvatarView = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6px;
`;

export const UserNameView = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
  margin-top: 14px;
  color: ${(props) => props.theme.primaryColor};
  font-size: 14px;
`;

export const FullNameView = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6px;
  color: #5e5e5e;
  font-weight: 600;
`;
export const PositionAccount = styled.div`
  font-style: italic;
  display: flex;
  justify-content: center;
  margin-top: 5px;
  font-size: 14px;
  color: #5e5e5e;
  font-weight: 600;
`;

export const ButtonChangePasswordLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;
export const TextButtonView = styled.div`
  width: 245px;
  font-weight: 600;
`;
export const ButtonLogoutLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 14px;
`;
export const ButtonEditAvatarLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 245px;
  font-weight: 600;
`;
export const ImgIconEditAvatar = styled.img`
  margin-left: 16px;
  height: 18px;
  width: 18px;
`;
