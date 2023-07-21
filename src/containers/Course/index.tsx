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
import { Container } from './style';
import { useTranslation } from 'react-i18next';
import { ColumnsType } from 'antd/es/table';
import TableFunction from '@/shared/components/TableOtherView/TableFunction';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useEffect } from 'react';
import * as actions from './actions';
import { DEFAULT_GET_LIST_PARAMS } from '@/utils/constants';
import * as selectors from './courseSlice';

export interface CourseType {
  name: string;
  description: string;
  weekday: {
    id: number;
    name: string;
    no: number;
  };
  period: {
    id: number;
    period: number;
    beginAt: string;
    endAt: string;
  }[];
}

const Course = ({
  showAdvanceSearch,
  onCloseAdvanceSearch,
}: ComponentPropsType) => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectors.selectIsLoading);
  const listCourse = useAppSelector(selectors.selectListCourse);
  const currentPage = useAppSelector(selectors.selectCurrentPage);
  const pageSize = useAppSelector(selectors.selectPageSize);
  const totalRecord = useAppSelector(selectors.selectTotalRecord);

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
      title: t('course.description'),
      dataIndex: 'description',
      key: 'description',
      width: '20%',
      render(text, record) {
        return <div>{record.description}</div>;
      },
    },
    // {
    //   title: t('student.address'),
    //   dataIndex: 'studentAddress',
    //   key: 'studentAddress',
    //   width: '40%',
    //   render(text, record) {
    //     return <div>{record.locationString}</div>;
    //   },
    // },
    // {
    //   title: t('student.status'),
    //   dataIndex: 'studentStatusId',
    //   key: 'studentStatusId',
    //   width: 80,
    //   render: (text, record) => (
    //     <TableFunction
    //       text={record.isActive ? t('student.active') : t('student.inActive')}
    //       record={record}
    //       titleEdit={t('common.tooltipEdit') as string}
    //       titleDelete={t('common.tooltipDelete') as string}
    //       titleHistory={t('common.tooltipHistory') as string}
    //       onClickEdit={() => handleEdit(record)}
    //       onClickDelete={() => handleDeleteStudent(record.id)}
    //       onClickHistory={() => {}}
    //     />
    //   ),
    // },
  ];

  const handleResetFilter = () => {};

  const handleAddNew = () => {};

  const handleCloseAdvanceSearch = () => {
    handleResetFilter();
    onCloseAdvanceSearch();
  };

  useEffect(() => {
    dispatch(actions.getListCourse(DEFAULT_GET_LIST_PARAMS));
  }, [dispatch]);

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
            onClickRow={(record) => {}}
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
            <ContentAdvanceView>123</ContentAdvanceView>
          </AdvanceSearchWrapper>
        )}
      </Content>
    </Container>
  );
};

export default Course;
