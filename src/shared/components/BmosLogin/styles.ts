import styled from 'styled-components';
import { Form } from 'antd';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;
const DivLeft = styled.div`
  width: 40%;
  background: white;
  height: 100vh;
  /* Small Devices, Tablets */
  @media only screen and (min-width: 0px) {
    display: none;
  }
  /* Medium Devices, Desktops */
  @media only screen and (min-width: 992px) {
    display: block;
  }
`;
const ImgLeft = styled.img`
  width: 90%;
  height: 100%;
  margin-left: 5%;
`;
const DivRight = styled.div<{ background: string }>`
  width: 60%;
  height: 100vh;
  background-image: url(${(props) => {
    return props.background;
  }});
  /* Small Devices, Tablets */
  @media only screen and (min-width: 0px) {
    width: 100%;
  }
  /* Medium Devices, Desktops */
  @media only screen and (min-width: 992px) {
    width: 60%;
  }
  @media only screen and (max-width: 692px) {
    overflow-y: scroll;
    padding: 15px;
    justify-content: normal;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-size: cover;
`;
const DivContentRight = styled.div`
  padding: 0 30px 50px;
  background: white;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media only screen and (max-width: 1366px) {
    zoom: 0.8;
  }
  @media only screen and (max-width: 1280px) {
    zoom: 0.9;
    padding-bottom: 0;
  }
  @media only screen and (max-width: 1100px) {
    zoom: 0.8;
  }
  @media only screen and (max-width: 992px) {
    zoom: 0.6;
  }
`;
const ImgTitleRight = styled.img``;
const FormInput = styled(Form)`
  padding-bottom: max(15px, 5%);
  width: 100%;
  height: 52%;
`;
const FormItem = styled(Form.Item)`
  width: 100%;
`;
const DivInputUsername = styled.div`
  height: 50px;
  font-size: 1em;
  font-style: normal;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
`;
const DivError = styled.div`
  font-style: normal;
  font-size: 1em;
  line-height: 19px;
  color: #dd281f;
`;
const DivInputPassword = styled.div`
  height: 50px;
  font-size: 1.14285em;
  font-style: normal;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  margin-top: 5px;
`;
const DivOption = styled.div`
  height: 35px;
  margin-top: 7px;
  @media only screen and (min-width: 650px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const KeepingLogin = styled.div`
  display: flex;
`;
const InputRadio = styled.input`
  width: 19.16px;
  height: 20px;
  background: white;
  border: 1px solid rgba(215, 215, 215, 0.75);
  box-sizing: border-box;
`;
const SpanKeepingLogin = styled.span<{ keepLogin: boolean }>`
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
  line-height: 19px;
  color: ${(props) => (props.keepLogin ? '#212529' : 'rgba(0, 0, 0, 0.25)')};
  :hover {
    color: #212529;
  }
`;
const DivLinkForgotPassword = styled.div`
  /* Medium Devices, Desktops */
  color: rgba(0, 0, 0, 0.25);
  /* Small Devices, Tablets */
  @media only screen and (max-width: 650px) {
    width: 100%;
    padding-top: 20px;
    padding-left: 20px;
  }
`;
const LinkForgotPassword = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
  line-height: 19px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.25);
  :hover {
    color: #212529;
  }
`;
const ButtonLoginUSB = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid #ff6e01;
  box-sizing: border-box;
  font-style: normal;
  font-weight: 400;
  font-size: 1.28571em;
  line-height: 25px;
  align-items: center;
  text-align: center;
  color: #ff6e01;
  margin-top: 10px;
  background: white;
  border-radius: 8px;
`;

export const ImageQr = styled.img`
  position: absolute;
  top: 24%;
  left: 18%;
  width: 100px;
  height: 100px;
  /* Medium Devices, Desktops */

  @media only screen and (min-width: 0px) {
    display: none;
  }

  @media only screen and (min-width: 992px) {
    display: block;
    top: 7%;
    left: 2%;
    width: 60px;
    height: 60px;
  }

  @media only screen and (min-width: 1200px) {
    display: block;
    top: 5%;
    left: 2%;
    width: 80px;
    height: 80px;
  }

  @media only screen and (min-width: 1220px) {
    display: block;
    top: 5%;
    left: 2%;
    width: 80px;
    height: 80px;
  }

  @media only screen and (min-width: 1350px) {
    display: block;
    top: 5%;
    left: 2%;
    width: 90px;
    height: 90px;
  }

  @media only screen and (min-width: 1500px) {
    display: block;
    top: 5%;
    left: 2%;
    width: 90px;
    height: 90px;
  }

  @media only screen and (min-width: 1600px) {
    display: block;
    top: 5%;
    left: 2%;
    width: 90px;
    height: 90px;
  }

  @media only screen and (min-width: 1750px) {
    display: block;
    top: 6%;
    left: 2%;
    width: 90px;
    height: 90px;
  }

  @media only screen and (min-width: 1900px) {
    display: block;
    top: 5%;
    left: 2%;
    width: 90px;
    height: 90px;
  }
`;
export const DivBoxQr = styled.div`
  position: absolute;
  top: 24%;
  left: 10%;
  height: 100px;
  width: 350px;
  border-radius: 12px;
  border: 1px solid black;

  @media only screen and (min-width: 0px) {
    display: none;
  }

  @media only screen and (min-width: 992px) {
    display: block;
    top: 34%;
    left: 9%;
    height: 72px;
    width: 225px;
  }

  @media only screen and (min-width: 1200px) {
    display: block;
    top: 32%;
    left: 9%;
    height: 90px;
    width: 300px;
  }

  @media only screen and (min-width: 1350px) {
    display: block;
    top: 29%;
    left: 9%;
    height: 100px;
    width: 310px;
  }

  @media only screen and (min-width: 1500px) {
    display: block;
    top: 28%;
    left: 10%;
    height: 100px;
    width: 310px;
  }

  @media only screen and (min-width: 1650px) {
    display: block;
    top: 27%;
    left: 10%;
    height: 100px;
    width: 350px;
  }

  @media only screen and (min-width: 1750px) {
    display: block;
    top: 26%;
    left: 11%;
    height: 100px;
    width: 350px;
  }

  @media only screen and (min-width: 1900px) {
    display: block;
    top: 25%;
    left: 11%;
    height: 100px;
    width: 350px;
  }
`;

export const DivTextQr = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 94%;
  float: right;
  position: absolute;
  top: 5%;
  left: 30%;

  @media only screen and (min-width: 1350px) {
    left: 31%;
  }

  @media only screen and (min-width: 1620px) {
    left: 32%;
  }

  @media only screen and (min-width: 1500px) {
    left: 31%;
  }
`;

export const SpanText = styled.span`
  font-size: 79%;
  font-weight: bold;

  @media only screen and (min-width: 1350px) {
    font-size: 1em;
  }
`;

export const DivButton = styled.div`
  display: flex;
  position: absolute;
  top: 57%;
  right: 2%;
  column-gap: 3px;

  @media only screen and (min-width: 1350px) {
    top: 57%;
    right: 9%;
  }

  @media only screen and (min-width: 1500px) {
    top: 57%;
    right: 7%;
  }

  @media only screen and (min-width: 1620px) {
    top: 57%;
    right: 5%;
  }
`;

export const ButtonDownLoad = styled.div`
  background-color: black;
  color: white;
  border-radius: 4px;
  height: auto;
  cursor: pointer;
  width: 100%;
`;

export const IconButton = styled.img`
  width: 100%;
  height: 100%;
`;

export {
  Container,
  DivLeft,
  ImgLeft,
  DivRight,
  DivContentRight,
  ImgTitleRight,
  FormInput,
  DivInputUsername,
  FormItem,
  DivError,
  DivInputPassword,
  DivOption,
  InputRadio,
  KeepingLogin,
  SpanKeepingLogin,
  DivLinkForgotPassword,
  LinkForgotPassword,
  ButtonLoginUSB,
};
