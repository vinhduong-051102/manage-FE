import { Container, FormStyled, Left } from './style';
import { useTranslation } from 'react-i18next';
import { Col, Form, Row } from 'antd';
import Input from '@/shared/components/FloatingLabel/Input';
import Button from '@/shared/components/Button';
import { useAppDispatch, useAppSelector } from '@/hooks';
import * as actions from './actions';
import * as selectors from './activeSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Notice from '@/shared/components/Notice';
import Cookies from 'js-cookie';
import { COOKIES } from '@/utils/constants';

const Active = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const isSuccess = useAppSelector(selectors.selectIsSuccess);
  const id = Cookies.get(COOKIES.id) as string;

  const handleSubmit = () => {
    form.validateFields().then((data) => {
      const password = data.newPassword;
      dispatch(
        actions.activeAccount({
          id: id,
          password: password,
        }),
      );
    });
  };

  useEffect(() => {
    if (isSuccess) {
      Notice({ msg: t('active.activeSuccess') });
      navigate('/login');
    }
  }, [isSuccess]);

  return (
    <Container>
      <div style={{ margin: 'auto' }}>
        <h3 style={{ textAlign: 'center' }}>{t('active.activeAccount')}</h3>
        <FormStyled form={form}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: t('active.newPasswordIsRequired') as string,
                  },
                  {
                    min: 10,
                    message: t('active.max') as string,
                  },
                ]}
              >
                <Input
                  label={t('active.newPasswordPlaceholder')}
                  isPass
                  isRequired
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: t('active.confirmPasswordIsRequired') as string,
                  },
                  {
                    validator: (rule, value) => {
                      if (value !== form.getFieldValue('newPassword')) {
                        return Promise.reject(
                          t('active.confirmPasswordIsNotMatch'),
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  label={t('active.confirmPasswordPlaceholder')}
                  isPass
                  isRequired
                />
              </Form.Item>
            </Col>
          </Row>
        </FormStyled>
        <Left>
          <Button onClick={handleSubmit}>{t('active.confirm')}</Button>
        </Left>
      </div>
    </Container>
  );
};

export default Active;
