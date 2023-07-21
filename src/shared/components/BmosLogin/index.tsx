import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import InputLogin from '@/shared/components/InputLogin';
import ButtonLogin from '@/shared/components/ButtonLoading';
import {
  Container,
  DivContentRight,
  DivLeft,
  DivRight,
  ImgLeft,
  ImgTitleRight,
  DivOption,
  SpanKeepingLogin,
  DivLinkForgotPassword,
  DivInputUsername,
  DivInputPassword,
  FormItem,
  FormInput,
  DivError,
  LinkForgotPassword,
} from './styles';
import {
  LABEL_PASSWORD,
  LABEL_USER_NAME,
  REGEX_PASSWORD,
  TEXT_BTN_LOGIN,
  TEXT_FORGET_PASSWORD,
  TEXT_KEEP_LOGIN,
  TEXT_REQUIRE_PASSWORD,
  TEXT_REQUIRE_USER_NAME,
  TEXT_REQUIRE_USER_NAME_PASSWORD,
  TEXT_WRONG_ACCOUNT,
} from './constants';
import bgLeftDefault from '@/images/bgLeft.svg';
import bgRightDefault from '@/images/bgRight.svg';
import logoDefault from '@/images//bgLogoLogin.svg';
import { axiosPost } from '@/utils/request';

interface PropsType {
  logoLogin?: string;
  textRequireUserNamePassword?: string;
  textRequireUserName?: string;
  textRequirePassword?: string;
  textWrongAccount?: string;
  labelUserName?: string;
  labelPassword?: string;
  textKeepLogin?: string;
  textForgetPassword?: string;
  textBtnLogin?: string;
  url: string;
  callbackResponse: (response: AxiosResponse, keepLogin: boolean) => void;
  callbackError: (error: AxiosError) => void;
  onClickLogin: () => void;
  isWrong?: boolean;
  onClickForgetPassword?: () => void;
  backgroundRightImg?: string;
}

const BmosLogin = ({
  logoLogin,
  textRequireUserNamePassword,
  textRequireUserName,
  textRequirePassword,
  textWrongAccount,
  labelUserName,
  labelPassword,
  textKeepLogin,
  textForgetPassword,
  textBtnLogin,
  url,
  callbackResponse,
  callbackError,
  onClickLogin,
  isWrong,
  onClickForgetPassword,
  backgroundRightImg,
}: PropsType) => {
  const [keepLogin, setKeepLogin] = useState(false);
  const [textError, setTextError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    username: false,
    password: false,
  });
  const [dataLogin, setDataLogin] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (isWrong) {
      setError({
        username: isWrong,
        password: isWrong,
      });
      setTextError(TEXT_WRONG_ACCOUNT || textWrongAccount);
    }
  }, [isWrong, textWrongAccount]);

  const onSubmitLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setTextError('');
    onLogin();
  };

  const onLogin = () => {
    onClickLogin();
    const { username } = dataLogin;
    const { password } = dataLogin;
    const isValidNullUsername = username.length === 0;
    const isValidNullPassword = password.length === 0;
    const isValidPassword = !REGEX_PASSWORD.test(password);
    setError({
      username: isValidNullUsername && isValidPassword,
      password: isValidNullPassword && isValidPassword,
    });
    if (isValidNullUsername && isValidNullPassword) {
      setTextError(
        TEXT_REQUIRE_USER_NAME_PASSWORD || textRequireUserNamePassword,
      );
    } else if (isValidNullUsername) {
      setTextError(TEXT_REQUIRE_USER_NAME || textRequireUserName);
    } else if (isValidNullPassword) {
      setTextError(TEXT_REQUIRE_PASSWORD || textRequirePassword);
    } else if (isValidPassword) {
      setTextError(TEXT_WRONG_ACCOUNT || textWrongAccount);
    }
    if (!isValidNullUsername && !isValidPassword && !isValidNullPassword) {
      setLoading(true);
      const data = {
        email: username.trim(),
        password,
      };
      axiosPost(url, data)
        .then((response) => {
          setLoading(false);
          callbackResponse(response, keepLogin);
        })
        .catch((error) => {
          setLoading(false);
          callbackError(error);
        });
    }
  };

  const onChange = useCallback(
    (value: string) => setDataLogin({ ...dataLogin, password: value }),
    [dataLogin],
  );

  return (
    <Container>
      <DivLeft>
        <ImgLeft src={bgLeftDefault} alt="anh bia" />
      </DivLeft>
      {/*@ts-ignore*/}
      <DivRight background={backgroundRightImg || bgRightDefault}>
        <DivContentRight>
          <ImgTitleRight src={logoLogin || logoDefault} alt="image title" />
          <FormInput>
            <DivInputUsername>
              <FormItem name="email">
                <InputLogin
                  onChange={(value) =>
                    setDataLogin({ ...dataLogin, username: value })
                  }
                  label={LABEL_USER_NAME || labelUserName}
                  error={error.username}
                />
              </FormItem>
            </DivInputUsername>
            <DivInputPassword>
              <FormItem name="password">
                <InputLogin
                  label={LABEL_PASSWORD || labelPassword}
                  type="password"
                  onChange={onChange}
                  error={error.password}
                  onEnter={() => onLogin()}
                />
              </FormItem>
            </DivInputPassword>
            <DivError>{textError}</DivError>
            <DivOption>
              <Checkbox onChange={(e) => setKeepLogin(e.target.checked)}>
                <SpanKeepingLogin keepLogin={keepLogin}>
                  {TEXT_KEEP_LOGIN || textKeepLogin}
                </SpanKeepingLogin>
              </Checkbox>
              <DivLinkForgotPassword>
                <LinkForgotPassword onClick={onClickForgetPassword}>
                  {TEXT_FORGET_PASSWORD || textForgetPassword}
                </LinkForgotPassword>
              </DivLinkForgotPassword>
            </DivOption>

            <ButtonLogin
              onClick={onSubmitLogin}
              loading={loading}
              value={TEXT_BTN_LOGIN || textBtnLogin}
            />
          </FormInput>
        </DivContentRight>
      </DivRight>
    </Container>
  );
};

export default BmosLogin;
