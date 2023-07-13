import { Container } from './style';
import {
  AdvanceSearchWrapper,
  Content,
  ContentHeader,
  ContentWrapper,
  HeaderLeft,
  HeaderRight,
  CloseAdvanceView,
  HeaderAdvanceView,
  TitleAdvance,
  ContentAdvanceView,
} from '@/shared/commonStyles';
import Table from '@/shared/components/Table';
import { useTranslation } from 'react-i18next';
import loadingIcon from '@/images/loading.svg';
import { ComponentPropsType } from '@/layout/LayoutLogged';
import { Col, Form, Row, Tooltip } from 'antd';
import iconCloseAdvance from '@/images/iconCloseAdvance.svg';
import advanceIcon from '@/images/iconAdvance.svg';
import refreshAdvanceIcon from '@/images/iconRefeshAdvance.svg';
import { useAppDispatch, useAppSelector } from '@/hooks';
import * as actions from './actions';
import { useEffect, useState } from 'react';
import { DEFAULT_GET_LIST_PARAMS, REGEX_EMAIL } from '@/utils/constants';
import { ColumnsType } from 'antd/es/table';
import * as selectors from './studentSlice';
import ModalHandle from '@/shared/components/ModalHandle';
import Input from '@/shared/components/FloatingLabel/Input';
import Select from '@/shared/components/FloatingLabel/SelectFloat';
import Button from '@/shared/components/Button';
import { CreateStudentPayload } from './actions';
import TableFunction from '@/shared/components/TableOtherView/TableFunction';

export interface StudentType {
  id: number;
  name: string;
  address: string;
  email: string;
  isActive: boolean;
}

const Student = ({
  showAdvanceSearch,
  onCloseAdvanceSearch,
}: ComponentPropsType) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const isLoading = useAppSelector(selectors.selectIsLoading);
  const tableData = useAppSelector(selectors.selectListStudent);
  const totalRecord = useAppSelector(selectors.selectTotalRecord);
  const pageSize = useAppSelector(selectors.selectPageSize);
  const currentPage = useAppSelector(selectors.selectCurrentPage);
  const listProvince = useAppSelector(selectors.selectListProvince);
  const listDistrict = useAppSelector(selectors.selectListDistrict);
  const listWard = useAppSelector(selectors.selectListWard);
  const isValidEmail = useAppSelector(selectors.selectIsValidEmail);

  const [isOpenModalAddNew, setIsOpenModalAddNew] = useState(false);
  const [codeProvinceSelect, setCodeProvinceSelect] = useState('');
  const [codeDistrictSelect, setCodeDistrictSelect] = useState('');
  const [codeWardSelect, setCodeWardSelect] = useState('');
  const [nameProvinceSelect, setNameProvinceSelect] = useState('');
  const [nameDistrictSelect, setNameDistrictSelect] = useState('');
  const [nameWardSelect, setNameWardSelect] = useState('');

  const TABLE_COLUMNS: ColumnsType<StudentType> = [
    {
      title: t('common.sttColumnTitle'),
      dataIndex: 'stt',
      key: 'stt',
      width: '5%',
      align: 'center',
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: t('student.name'),
      dataIndex: 'studentName',
      key: 'studentName',
      width: '10%',
      render(text, record) {
        return <div>{record.name}</div>;
      },
    },
    {
      title: t('student.email'),
      dataIndex: 'studentEmail',
      key: 'studentEmail',
      width: '20%',
      render(text, record) {
        return <div>{record.email}</div>;
      },
    },
    {
      title: t('student.address'),
      dataIndex: 'studentAddress',
      key: 'studentAddress',
      width: '40%',
      render(text, record) {
        return <div>{record.address}</div>;
      },
    },
    {
      title: t('student.status'),
      dataIndex: 'studentStatusId',
      key: 'studentStatusId',
      width: 80,
      render: (text, record) => (
        <TableFunction
          text={record.isActive ? t('student.active') : t('student.inActive')}
          record={record}
          titleEdit={t('common.tooltipEdit') as string}
          titleDelete={t('common.tooltipDelete') as string}
          titleHistory={t('common.tooltipHistory') as string}
          onClickEdit={() => {}}
          onClickDelete={() => {}}
          onClickHistory={() => {}}
        />
      ),
    },
  ];

  const handleCloseAdvanceSearch = () => {
    handleResetFilter();
    onCloseAdvanceSearch();
  };

  const handleResetFilter = () => {};

  const handleSubmitForm = () => {
    form
      .validateFields()
      .then((data) => {
        const payload: CreateStudentPayload = {
          username: data.name,
          email: data.email,
          address: `${nameProvinceSelect}, ${nameDistrictSelect}, ${nameWardSelect}, ${data.address}`,
        };
        dispatch(actions.createStudent(payload));
        handleCloseModalAddNew();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseModalAddNew = () => {
    dispatch(actions.resetLocation());
    setIsOpenModalAddNew(false);
    form.resetFields();
    setCodeWardSelect('');
    setCodeDistrictSelect('');
    setCodeProvinceSelect('');
  };

  useEffect(() => {
    dispatch(
      actions.getListStudent({
        ...DEFAULT_GET_LIST_PARAMS,
      }),
    );
    if (isOpenModalAddNew) {
      dispatch(actions.getListProvince());
    } else {
      dispatch(actions.setValidEmail(true));
    }
  }, [dispatch, isOpenModalAddNew]);

  useEffect(() => {
    if (codeProvinceSelect) {
      dispatch(actions.getListDistrict({ code: codeProvinceSelect }));
    }
  }, [codeProvinceSelect, dispatch]);

  useEffect(() => {
    if (codeDistrictSelect) {
      dispatch(actions.getListWard({ code: codeDistrictSelect }));
    }
  }, [codeDistrictSelect, dispatch]);

  useEffect(() => {
    if (!isValidEmail) {
      form
        .validateFields(['email'])
        .then()
        .catch((error) => console.log(error));
    }
  }, [isValidEmail, form]);

  const getNameSelected = (
    list: {
      fullName: string;
      code: string;
    }[],
    codeSelected: string,
  ) => {
    const itemSelected = list.find((item) => item.code === codeSelected);
    return itemSelected ? itemSelected.fullName : '';
  };

  return (
    <Container>
      <Content>
        <ContentWrapper showAdvanceSearch={showAdvanceSearch}>
          <ContentHeader>
            <HeaderLeft>
              <h3>
                {t('student.totalRecord')}: {totalRecord}
              </h3>
            </HeaderLeft>
            <HeaderRight>
              <Button
                onClick={() => setIsOpenModalAddNew(true)}
                iconname={'add-primary'}
              >
                {t('student.addNew')}
              </Button>
            </HeaderRight>
          </ContentHeader>
          <Table
            isLoading={isLoading}
            columns={TABLE_COLUMNS}
            data={tableData}
            loadingIcon={loadingIcon}
            pagination
            totalRecord={totalRecord}
            onClickRow={() => {}}
          />
        </ContentWrapper>
        {showAdvanceSearch && (
          <AdvanceSearchWrapper>
            <CloseAdvanceView>
              <Tooltip title={t('common.close')}>
                <img
                  src={iconCloseAdvance}
                  alt={t('profile.close') as string}
                  onClick={handleCloseAdvanceSearch}
                />
              </Tooltip>
            </CloseAdvanceView>
            <HeaderAdvanceView style={{ width: 260 }}>
              <img alt="" src={advanceIcon} />
              <TitleAdvance>{t('common.advanceSearch')}</TitleAdvance>
              <Tooltip title={t('common.resetFilter')}>
                <img
                  style={{ cursor: 'pointer', marginLeft: '5px' }}
                  alt=""
                  src={refreshAdvanceIcon}
                  onClick={handleResetFilter}
                />
              </Tooltip>
            </HeaderAdvanceView>
            <ContentAdvanceView>
              <Form form={form}>dsad</Form>
            </ContentAdvanceView>
          </AdvanceSearchWrapper>
        )}

        <ModalHandle
          title={t('student.addNew') as string}
          visible={isOpenModalAddNew}
          isLoading={isLoading}
          onClickCancel={handleCloseModalAddNew}
          onSave={handleSubmitForm}
          forceRender
        >
          <Form form={form} name="addNewForm">
            <Row gutter={[50, 20]}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: t('student.nameIsRequired') as string,
                    },
                  ]}
                >
                  <Input label={t('student.name')} isRequired />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      validator: (rule, value) => {
                        if (!value) {
                          return Promise.reject(t('student.emailIsRequired'));
                        }
                        if (!REGEX_EMAIL.test(value)) {
                          return Promise.reject(t('student.emailIsValid'));
                        }
                        if (!isValidEmail) {
                          return Promise.reject(t('student.duplicateEmail'));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    label={t('student.email')}
                    isRequired
                    onBlur={(e) => {
                      dispatch(actions.checkEmail(e.target.value));
                    }}
                    onChange={(e) => {
                      dispatch(actions.checkEmail(e.target.value));
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="province"
                  rules={[
                    {
                      required: true,
                      message: t('student.provinceIsRequired') as string,
                    },
                  ]}
                >
                  <Select
                    label={t('student.province') as string}
                    isRequired
                    dataSelect={listProvince.map((item) => {
                      return {
                        label: item.fullName,
                        value: item.code,
                      };
                    })}
                    onChangeSelect={(value) => {
                      form.setFieldValue('province', value);
                      setCodeProvinceSelect(value);
                      const nameSelected = getNameSelected(listProvince, value);
                      setNameProvinceSelect(nameSelected);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: t('student.districtIsRequired') as string,
                    },
                  ]}
                >
                  <Select
                    label={t('student.district') as string}
                    isRequired
                    dataSelect={listDistrict.map((item) => {
                      return {
                        label: item.fullName,
                        value: item.code,
                      };
                    })}
                    onChangeSelect={(value) => {
                      form.setFieldValue('district', value);
                      setCodeDistrictSelect(value);
                      const nameSelected = getNameSelected(listDistrict, value);
                      setNameDistrictSelect(nameSelected);
                    }}
                    disabled={listDistrict.length === 0}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="ward"
                  rules={[
                    {
                      required: true,
                      message: t('student.wardIsRequired') as string,
                    },
                  ]}
                >
                  <Select
                    label={t('student.ward') as string}
                    isRequired
                    dataSelect={listWard.map((item) => {
                      return {
                        label: item.fullName,
                        value: item.code,
                      };
                    })}
                    onChangeSelect={(value) => {
                      form.setFieldValue('ward', value);
                      setCodeWardSelect(value);
                      const nameSelected = getNameSelected(listWard, value);
                      setNameWardSelect(nameSelected);
                    }}
                    disabled={listWard.length === 0}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: t('student.addressIsRequired') as string,
                    },
                  ]}
                >
                  <Input
                    label={t('student.address')}
                    isRequired
                    disabled={!codeWardSelect}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </ModalHandle>
      </Content>
    </Container>
  );
};

export default Student;
