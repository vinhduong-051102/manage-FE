import {
  AdvanceSearchWrapper,
  CloseAdvanceView,
  Content,
  ContentAdvanceView,
  ContentHeader,
  ContentWrapper,
  HeaderAdvanceView,
  HeaderLeft,
  HeaderRight,
  TitleAdvance,
} from '@/shared/commonStyles';
import Button from '@/shared/components/Button';
import Table from '@/shared/components/Table';
import loadingIcon from '@/images/loading.svg';
import { Col, Form, Row, Tooltip } from 'antd';
import iconCloseAdvance from '@/images/iconCloseAdvance.svg';
import advanceIcon from '@/images/iconAdvance.svg';
import refreshAdvanceIcon from '@/images/iconRefeshAdvance.svg';
import { ComponentPropsType } from '@/layout/LayoutLogged';
import { Container, ReactQuillStyled } from './style';
import { useTranslation } from 'react-i18next';
import { ColumnsType } from 'antd/es/table';
import TableFunction from '@/shared/components/TableOtherView/TableFunction';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useEffect, useState } from 'react';
import * as actions from './actions';
import { DEFAULT_GET_LIST_PARAMS } from '@/utils/constants';
import * as selectors from './courseSlice';
import ModalHandle from '@/shared/components/ModalHandle';
import Input from '@/shared/components/FloatingLabel/Input';
import 'react-quill/dist/quill.snow.css';
import Select from '@/shared/components/FloatingLabel/SelectFloat';
import MultiSelect from '@/shared/components/FloatingLabel/MultiSelectFloat';
import { CreateCourseType } from './actions';
import ModalFullScreen from '@/shared/components/ModalFullScreen';
import ViewDetail from '@/containers/admin/Course/components/ViewDetail';
import { DatePicker } from 'antd';
import vi from 'antd/lib/locale/vi_VN';
import dayjs from 'dayjs';
import { IStyled } from '@/containers/admin/Course/components/ViewDetail/style';
import { getDateFromTimeStamp } from '@/shared/commonFunction';

export interface WeekdayType {
  id: number;
  name: string;
  no: number;
}

export interface PeriodType {
  id: number;
  period: number;
  beginAt: string;
  endAt: string;
}

export interface CourseType {
  id: number;
  name: string;
  shortDescription: string;
  detailDescription: string;
  weekDay: WeekdayType;
  listPeriod: PeriodType[];
  endDate: number;
  beginDate: number;
}

const Course = ({
  showAdvanceSearch,
  onCloseAdvanceSearch,
  textSearch,
}: ComponentPropsType) => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectors.selectIsLoading);
  const listCourse = useAppSelector(selectors.selectListCourse);
  const currentPage = useAppSelector(selectors.selectCurrentPage);
  const pageSize = useAppSelector(selectors.selectPageSize);
  const totalRecord = useAppSelector(selectors.selectTotalRecord);
  const listPeriod = useAppSelector(selectors.selectListPeriod);
  const listWeekday = useAppSelector(selectors.selectListWeekday);
  const [form] = Form.useForm();

  const [isOpenModalAddNew, setIsOpenModalAddNew] = useState(false);
  const [value, setValue] = useState('');
  const [listPeriodSelected, setListPeriodSelected] = useState<string[]>([]);
  const [weekdaySelected, setWeekdaySelected] = useState<string>('');
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const [recordSelected, setRecordSelected] = useState<CourseType>({
    name: '',
    id: 0,
    shortDescription: '',
    detailDescription: '',
    listPeriod: [],
    weekDay: {
      id: 0,
      no: 0,
      name: '',
    },
    beginDate: 0,
    endDate: 0,
  });
  const [idEdit, setIdEdit] = useState(0);
  const [statusFilter, setStatusFilter] = useState<'all' | '0' | '1' | '2'>(
    'all',
  );
  const [enrollStatusFilter, setEnrollStatusFilter] = useState<
    'all' | '0' | '1'
  >('all');
  const [weekdayFilter, setWeekdayFilter] = useState<string>('all');

  const TABLE_COLUMNS: ColumnsType<CourseType> = [
    {
      title: t('common.sttColumnTitle'),
      dataIndex: 'stt',
      key: 'stt',
      width: '5%',
      align: 'center',
      render: (text, record, index) => (
        <b>{(currentPage - 1) * pageSize + index + 1}</b>
      ),
    },
    {
      title: t('course.name'),
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      render(text, record) {
        return <div>{record.name}</div>;
      },
    },
    {
      title: t('course.shortDescription'),
      dataIndex: 'shortDescription',
      key: 'shortDescription',
      width: '20%',
      render(text, record) {
        return <div>{record.shortDescription}</div>;
      },
    },
    {
      title: (
        <div>
          <div>{t('course.weekday')}</div>
          <IStyled>{t('course.period')}</IStyled>
        </div>
      ),
      dataIndex: 'weekday',
      key: 'weekday',
      width: '8%',
      render(text, record) {
        return (
          <>
            <div>
              <b>{t(`common.${record.weekDay.name}`)}</b>
            </div>
            <div>
              <i>
                {record.listPeriod
                  .map((period) => t('course.period') + ' ' + period.period)
                  .join(', ')}
              </i>
            </div>
          </>
        );
      },
    },
    {
      title: (
        <div>
          <div>{t('course.beginDate')}</div>
          <IStyled>{t('course.endDate')}</IStyled>
        </div>
      ),
      dataIndex: 'date',
      key: 'date',
      width: '10%',
      render(text, record) {
        return (
          <>
            <div>
              <b>{getDateFromTimeStamp(record.beginDate)}</b>
            </div>
            <div>
              <i>{getDateFromTimeStamp(record.endDate)}</i>
            </div>
          </>
        );
      },
    },
    {
      title: t('course.status'),
      dataIndex: 'studentStatusId',
      key: 'studentStatusId',
      width: '10%',
      render: (text, record) => {
        const status = checkStatus(record.beginDate, record.endDate);
        return (
          <TableFunction
            text={
              ((status === 1 && t('course.notYet')) as string) ||
              ((status === 2 && t('course.inProcess')) as string) ||
              ((status === 3 && t('course.ended')) as string)
            }
            record={{ ...record, isActive: status === 2 }}
            titleEdit={t('common.tooltipEdit') as string}
            titleDelete={t('common.tooltipDelete') as string}
            titleHistory={t('common.tooltipHistory') as string}
            onClickEdit={() => handleEdit(record)}
            onClickDelete={() => handleDelete(record.id)}
            onClickHistory={() => {}}
          />
        );
      },
    },
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
      [
        {
          align: ['justify', 'center', 'right'],
        },
      ],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
  ];

  const handleResetFilter = () => {
    setEnrollStatusFilter('all');
    setStatusFilter('all');
    setWeekdayFilter('all');
    form.setFieldValue('statusFilter', 'all');
    form.setFieldValue('weekdayFilter', 'all');
    form.setFieldValue('enrollStatusFilter', 'all');
  };

  const handleAddNew = () => {
    setIsOpenModalAddNew(true);
  };

  const handleCloseAdvanceSearch = () => {
    handleResetFilter();
    onCloseAdvanceSearch();
  };

  const handleCloseModalAddNew = () => {
    setIsOpenModalAddNew(false);
    form.resetFields();
    setListPeriodSelected([]);
    setWeekdaySelected('');
    setIsEdit(false);
  };

  const handleSubmitForm = () => {
    form.validateFields().then((data) => {
      const payload: CreateCourseType = {
        name: data.name,
        shortDescription: data.shortDescription,
        detailDescription: data.detailDescription,
        periods: listPeriodSelected,
        weekDay: weekdaySelected,
        endDate: new Date(data.date[1].$d).getTime(),
        beginDate: new Date(data.date[0].$d).getTime(),
      };
      if (isEdit) {
        dispatch(actions.editCourse({ ...payload, id: idEdit }));
      } else {
        dispatch(actions.createCourse(payload));
      }
      setIsOpenModalAddNew(false);
    });
  };

  const handleViewDetail = (record: CourseType) => {
    setRecordSelected(record);
    setIsOpenModalDetail(true);
  };

  const handleEdit = (record: CourseType) => {
    form.setFieldValue('name', record.name);
    form.setFieldValue('shortDescription', record.shortDescription);
    form.setFieldValue('detailDescription', record.detailDescription);
    form.setFieldValue('weekday', record.weekDay);
    form.setFieldValue('period', record.listPeriod);
    form.setFieldValue('date', [
      dayjs(record.beginDate),
      dayjs(record.endDate),
    ]);
    setIdEdit(record.id);
    setValue(record.detailDescription);
    setWeekdaySelected(`${record.weekDay.no}`);
    setListPeriodSelected(record.listPeriod.map((item) => `${item.id}`));
    setIsEdit(true);
    setIsOpenModalAddNew(true);
  };

  const checkStatus: (begin: number, end: number) => 1 | 2 | 3 = (
    begin,
    end,
  ) => {
    const now = new Date(Date.now()).getTime();
    if (now < begin) {
      return 1;
    } else if (now >= begin && now < end) {
      return 2;
    } else {
      return 3;
    }
  };

  const handleDelete = (id: number) => {
    dispatch(actions.deleteCourse(id));
  };

  useEffect(() => {
    dispatch(actions.getListCourse(DEFAULT_GET_LIST_PARAMS));
    dispatch(actions.getListWeekday());
    dispatch(actions.getListPeriod());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      actions.easySearch({
        ...DEFAULT_GET_LIST_PARAMS,
        keySearch: textSearch,
      }),
    );
  }, [textSearch, dispatch]);

  return (
    <Container>
      <Content>
        <ContentWrapper showAdvanceSearch={showAdvanceSearch}>
          <ContentHeader>
            <HeaderLeft>
              <h3>
                {t('course.totalRecord')}: {totalRecord}
              </h3>
            </HeaderLeft>
            <HeaderRight>
              <Button onClick={handleAddNew} iconname={'add-primary'}>
                {t('course.addNew')}
              </Button>
            </HeaderRight>
          </ContentHeader>
          <Table
            isLoading={isLoading}
            columns={TABLE_COLUMNS}
            data={listCourse}
            loadingIcon={loadingIcon}
            pagination
            totalRecord={totalRecord}
            onClickRow={handleViewDetail}
          />
        </ContentWrapper>
        {showAdvanceSearch && (
          <AdvanceSearchWrapper>
            <CloseAdvanceView>
              <Tooltip title={t('common.close')}>
                <img
                  src={iconCloseAdvance}
                  alt={t('common.close') as string}
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
              <Form form={form}>
                <Row>
                  <Col span={24}>
                    <Form.Item name={'statusFilter'}>
                      <Select
                        dataSelect={[
                          {
                            label: t('common.all'),
                            value: 'all',
                          },
                          {
                            label: t('course.notYet'),
                            value: '0',
                          },
                          {
                            label: t('course.inProcess'),
                            value: '1',
                          },
                          {
                            label: t('course.ended'),
                            value: '2',
                          },
                        ]}
                        label={t('course.status')}
                        valueSelect={statusFilter}
                        onChangeSelect={(value) => {
                          form.setFieldValue('statusFilter', value);
                          setStatusFilter(value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="enrollStatusFilter">
                      <Select
                        dataSelect={[
                          {
                            label: t('common.all'),
                            value: 'all',
                          },
                          {
                            label: t('course.inEnrolled'),
                            value: '0',
                          },
                          {
                            label: t('course.enrolled'),
                            value: '1',
                          },
                        ]}
                        label={t('course.enrollStatus')}
                        valueSelect={enrollStatusFilter}
                        onChangeSelect={(value) => {
                          form.setFieldValue('enrollStatus', value);
                          setEnrollStatusFilter(value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="weekdayFilter">
                      <Select
                        dataSelect={[
                          {
                            label: t('common.all'),
                            value: 'all',
                          },
                          ...listWeekday.map((i) => ({
                            label: t(`common.${i.name}`),
                            value: `${i.no}`,
                          })),
                        ]}
                        label={t('course.weekday')}
                        valueSelect={weekdayFilter}
                        onChangeSelect={(value) => {
                          form.setFieldValue('weekdayFilter', value);
                          setWeekdayFilter(value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </ContentAdvanceView>
          </AdvanceSearchWrapper>
        )}
        <ModalHandle
          isLoading={isLoading}
          visible={isOpenModalAddNew}
          onClickCancel={handleCloseModalAddNew}
          onSave={handleSubmitForm}
          title={isEdit ? t('course.edit') : t('course.addNew')}
          forceRender
        >
          <Form form={form}>
            <Row gutter={[50, 20]}>
              <Col span={12}>
                <Form.Item
                  name={'name'}
                  rules={[
                    {
                      required: true,
                      message: t('course.nameIsRequired') as string,
                    },
                  ]}
                >
                  <Input label={t('course.name')} isRequired />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={'shortDescription'}
                  rules={[
                    {
                      required: true,
                      message: t('course.shortDescriptionIsRequired') as string,
                    },
                  ]}
                >
                  <Input label={t('course.shortDescription')} isRequired />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={'detailDescription'}
                  label={<h4>{t('course.detailDescription')}</h4>}
                  labelCol={{ span: 24 }}
                >
                  <ReactQuillStyled
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={value}
                    onChange={(e) => {
                      setValue(e);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="weekday"
                  rules={[
                    {
                      required: true,
                      message: t('course.weekdayIsRequired') as string,
                    },
                  ]}
                >
                  <Select
                    dataSelect={listWeekday.map((item) => ({
                      label: t(`common.${item.name}`),
                      value: `${item.no}`,
                    }))}
                    label={t('course.weekday')}
                    valueSelect={weekdaySelected}
                    onChangeSelect={(value) => {
                      form.setFieldValue('weekday', value);
                      setWeekdaySelected(value);
                      setListPeriodSelected([]);
                      form.setFieldValue('period', []);
                    }}
                    isRequired
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  validateTrigger={'onchange'}
                  name="period"
                  rules={[
                    {
                      validator(rule, value) {
                        if (Array.isArray(value) && !value.length) {
                          return Promise.reject(t('course.periodIsRequired'));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <MultiSelect
                    dataSelect={listPeriod.map((item) => ({
                      label: t('course.period') + ' ' + item.period,
                      value: `${item.id}`,
                    }))}
                    onChangeSelect={(value) => {
                      form.setFieldValue('period', value);
                      setListPeriodSelected(value);
                    }}
                    label={t('course.period')}
                    valueSelect={listPeriodSelected}
                    allowClear
                    isRequired
                    disabled={!weekdaySelected}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  validateTrigger={'onchange'}
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: t('course.dateIsRequired') as string,
                    },
                  ]}
                >
                  <DatePicker.RangePicker
                    format={'DD-MM-YYYY'}
                    locale={vi.DatePicker}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </ModalHandle>
        <ModalFullScreen
          title={t('course.viewDetail')}
          visible={isOpenModalDetail}
          onClickCancel={() => setIsOpenModalDetail(false)}
        >
          <ViewDetail record={recordSelected} />
        </ModalFullScreen>
      </Content>
    </Container>
  );
};

export default Course;
