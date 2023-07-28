import { CourseType } from '@/containers/admin/Course';
import 'react-quill/dist/quill.snow.css';
import {
  DescriptionDetailContainer,
  DescriptionsStyled,
  IStyled,
  TitleStyled,
} from '@/containers/admin/Course/components/ViewDetail/style';
import { useTranslation } from 'react-i18next';
import loadingIcon from '@/images/loading.svg';
import Table from '@/shared/components/Table';
import { useAppSelector, useAppDispatch } from '@/hooks';
import * as selectors from '@/containers/admin/Student/studentSlice';
import * as actions from '@/containers/admin/Student/actions';
import { ColumnsType } from 'antd/es/table';
import TableFunction from '@/shared/components/TableOtherView/TableFunction';
import { StudentType } from '@/containers/admin/Student';
import { useEffect } from 'react';
import { DEFAULT_GET_LIST_PARAMS } from '@/utils/constants';
import { getDateFromTimeStamp } from '@/shared/commonFunction';

interface PropsType {
  record: CourseType;
}

const ViewDetail = ({ record }: PropsType) => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const { id, name, shortDescription } = record;

  const isLoading = useAppSelector(selectors.selectIsLoading);
  const currentPage = useAppSelector(selectors.selectCurrentPage);
  const pageSize = useAppSelector(selectors.selectPageSize);
  const tableData = useAppSelector(selectors.selectListStudent);
  const totalRecord = useAppSelector(selectors.selectTotalRecord);

  const TABLE_COLUMNS: ColumnsType<StudentType> = [
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
        return <div>{record.locationString}</div>;
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
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(
      actions.getListStudentEnrollCourse({ ...DEFAULT_GET_LIST_PARAMS, id }),
    );
  }, [dispatch, id]);

  return (
    <>
      <DescriptionsStyled
        bordered
        title={t('course.detailTitle')}
        layout="vertical"
        column={24}
      >
        <DescriptionsStyled.Item label={t('course.id')}>
          {id}
        </DescriptionsStyled.Item>
        <DescriptionsStyled.Item label={t('course.name')}>
          {name}
        </DescriptionsStyled.Item>
        <DescriptionsStyled.Item label={t('course.shortDescription')}>
          {shortDescription}
        </DescriptionsStyled.Item>
        <DescriptionsStyled.Item
          label={
            <div>
              <div>{t('course.weekday')}</div>
              <IStyled>{t('course.period')}</IStyled>
            </div>
          }
        >
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
        </DescriptionsStyled.Item>
        <DescriptionsStyled.Item
          label={
            <div>
              <div>{t('course.beginDate')}</div>
              <IStyled>{t('course.endDate')}</IStyled>
            </div>
          }
        >
          <>
            <div>
              <b>{getDateFromTimeStamp(record.beginDate)}</b>
            </div>
            <div>
              <i>{getDateFromTimeStamp(record.endDate)}</i>
            </div>
          </>
        </DescriptionsStyled.Item>
      </DescriptionsStyled>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TitleStyled>{t('course.detailDescription')}</TitleStyled>
      </div>
      <DescriptionDetailContainer>
        <div
          dangerouslySetInnerHTML={{ __html: record.detailDescription }}
          className="ql-editor"
        />
      </DescriptionDetailContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TitleStyled>{t('course.listStudent')}</TitleStyled>
      </div>
      <Table
        isLoading={isLoading}
        columns={TABLE_COLUMNS}
        data={tableData}
        loadingIcon={loadingIcon}
        pagination
        totalRecord={totalRecord}
        onClickRow={() => {}}
      />
    </>
  );
};

export default ViewDetail;
