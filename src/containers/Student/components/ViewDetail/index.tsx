import { StudentType } from '@/containers/Student';
import {
  DescriptionsStyled,
  StatusLabel,
  TableContainer,
  FilterContainer,
} from '@/containers/Student/components/ViewDetail/style';
import { useTranslation } from 'react-i18next';
import SelectFloat from '@/shared/components/FloatingLabel/SelectFloat';
import { useEffect, useState } from 'react';
import Table from '@/shared/components/Table';
import loadingIcon from '@/images/loading.svg';
import { useAppSelector, useAppDispatch } from '@/hooks';
import * as selectors from '@/containers/Course/courseSlice';
import * as actions from '@/containers/Course/actions';
import { ColumnsType } from 'antd/es/table';
import { IStyled } from '@/containers/Course/components/ViewDetail/style';
import { getDateFromTimeStamp } from '@/shared/commonFunction';
import TableFunction from '@/shared/components/TableOtherView/TableFunction';
import { CourseType } from '@/containers/Course';
import { DEFAULT_GET_LIST_PARAMS } from '@/utils/constants';

const ViewDetail = ({ data }: { data: StudentType }) => {
  const [t] = useTranslation();
  const { id, isActive, locationString, email, name } = data;
  const dispatch = useAppDispatch();

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
          />
        );
      },
    },
  ];

  const isLoading = useAppSelector(selectors.selectIsLoading);
  const totalRecord = useAppSelector(selectors.selectTotalRecord);
  const currentPage = useAppSelector(selectors.selectCurrentPage);
  const pageSize = useAppSelector(selectors.selectPageSize);
  const listCourse = useAppSelector(selectors.selectListCourse);

  const [courseType, setCourseType] = useState<'0' | '1'>(() =>
    data.isActive ? '0' : '1',
  );

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

  useEffect(() => {
    if (courseType === '0') {
      dispatch(
        actions.getListCourseByStudentId({
          ...DEFAULT_GET_LIST_PARAMS,
          id: data.id,
        }),
      );
    } else {
      dispatch(
        actions.getListCourseIsNotContainStudentId({
          ...DEFAULT_GET_LIST_PARAMS,
          id: data.id,
        }),
      );
    }
  }, [courseType]);

  return (
    <>
      <DescriptionsStyled
        bordered
        title={t('student.detailTitle')}
        layout="vertical"
        column={24}
      >
        <DescriptionsStyled.Item label={t('student.id')}>
          {id}
        </DescriptionsStyled.Item>
        <DescriptionsStyled.Item label={t('student.name')}>
          {name}
        </DescriptionsStyled.Item>
        <DescriptionsStyled.Item label={t('student.email')}>
          {email}
        </DescriptionsStyled.Item>
        <DescriptionsStyled.Item label={t('student.address')}>
          {locationString}
        </DescriptionsStyled.Item>
        <DescriptionsStyled.Item label={t('student.status')}>
          <StatusLabel active={isActive}>
            {isActive ? t('student.active') : t('student.inActive')}
          </StatusLabel>
        </DescriptionsStyled.Item>
      </DescriptionsStyled>
      <TableContainer isFilterLeft>
        <FilterContainer>
          <SelectFloat
            dataSelect={[
              {
                label: t('student.courseEnroll'),
                value: '0',
              },
              {
                label: t('student.courseNotEnroll'),
                value: '1',
              },
            ]}
            label={t('student.status')}
            onChangeSelect={(value) => {
              setCourseType(value);
            }}
            valueSelect={courseType}
          />
        </FilterContainer>
      </TableContainer>
      <Table
        isLoading={isLoading}
        columns={TABLE_COLUMNS}
        data={listCourse}
        loadingIcon={loadingIcon}
        pagination
        totalRecord={totalRecord}
        onClickRow={() => {}}
      />
    </>
  );
};

export default ViewDetail;
