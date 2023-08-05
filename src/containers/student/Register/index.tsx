import { Container, LabelCourseTime, Title, ButtonContainer } from './style';
import Table from '@/shared/components/Table';
import loadingIcon from '@/images/loading.svg';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import React, { useState } from 'react';
import ModalFullScreen from '@/shared/components/ModalFullScreen';
import { useAppDispatch, useAppSelector } from '@/hooks';
import * as actions from './actions';
import * as selectors from './registerSlice';
import Cookies from 'js-cookie';
import { COOKIES } from '@/utils/constants';
import { CourseType } from '@/containers/admin/Course';
import {
  DescriptionDetailContainer,
  DescriptionsStyled,
  IStyled,
  TitleStyled,
} from '@/containers/admin/Course/components/ViewDetail/style';
import { getDateFromTimeStamp } from '@/shared/commonFunction';
import { TableRowSelection } from 'antd/es/table/interface';
import ModalHandle from '@/shared/components/ModalHandle';
import 'react-quill/dist/quill.snow.css';

interface CourseTimeType {
  name: string;
  time: number[];
}

const Register = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const userId = Cookies.get(COOKIES.id);

  const isLoading = useAppSelector(selectors.selectIsLoading);
  const listCourse = useAppSelector(selectors.selectListCourse);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const [courseSelected, setCourseSelected] = useState<CourseType>({
    id: 0,
    name: '',
    shortDescription: '',
    detailDescription: '',
    weekDay: {
      id: 0,
      name: '',
      no: 0,
    },
    listPeriod: [],
    endDate: 0,
    beginDate: 0,
  });

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<CourseType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 20,
  };

  const TABLE_COURSE_COLUMNS: ColumnsType<CourseType> = [
    {
      title: t('course.id'),
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      align: 'center',
      render(text, record) {
        return <b>{record.id}</b>;
      },
    },
    {
      title: t('course.name'),
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render(text, record) {
        return <div>{record.name}</div>;
      },
    },
    {
      title: t('course.shortDescription'),
      dataIndex: 'shortDescription',
      key: 'shortDescription',
      width: '30%',
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
      width: '20%',
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
      width: '20%',
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
  ];

  const TABLE_COLUMNS: ColumnsType<CourseTimeType> = [
    {
      title: t('register.courseTime'),
      dataIndex: 'courseTime',
      width: '10%',
      key: 'courseTime',
      render: (text, record) => {
        return <LabelCourseTime>{record.name}</LabelCourseTime>;
      },
    },
    {
      title: t('common.monday'),
      dataIndex: 'courseTime',
      width: '10%',
      key: 'courseTime',
      align: 'center',
      render: (text, record) => {
        return (
          <ButtonContainer>
            <Button onClick={() => handleClickCourseTime(record.time, 1)}>
              {t('register.choose')}
            </Button>
          </ButtonContainer>
        );
      },
    },
    {
      title: t('common.tuesday'),
      dataIndex: 'courseTime',
      width: '10%',
      key: 'courseTime',
      align: 'center',

      render: (text, record) => {
        return (
          <ButtonContainer>
            <Button onClick={() => handleClickCourseTime(record.time, 2)}>
              {t('register.choose')}
            </Button>
          </ButtonContainer>
        );
      },
    },
    {
      title: t('common.wednesday'),
      dataIndex: 'courseTime',
      width: '10%',
      key: 'courseTime',
      align: 'center',

      render: (text, record) => {
        return (
          <ButtonContainer>
            <Button onClick={() => handleClickCourseTime(record.time, 3)}>
              {t('register.choose')}
            </Button>
          </ButtonContainer>
        );
      },
    },
    {
      title: t('common.thursday'),
      dataIndex: 'courseTime',
      width: '10%',
      key: 'courseTime',
      align: 'center',

      render: (text, record) => {
        return (
          <ButtonContainer>
            <Button onClick={() => handleClickCourseTime(record.time, 4)}>
              {t('register.choose')}
            </Button>
          </ButtonContainer>
        );
      },
    },
    {
      title: t('common.friday'),
      dataIndex: 'courseTime',
      width: '10%',
      key: 'courseTime',
      align: 'center',

      render: (text, record) => {
        return (
          <ButtonContainer>
            <Button onClick={() => handleClickCourseTime(record.time, 5)}>
              {t('register.choose')}
            </Button>
          </ButtonContainer>
        );
      },
    },
    {
      title: t('common.saturday'),
      dataIndex: 'courseTime',
      width: '10%',
      key: 'courseTime',
      align: 'center',

      render: (text, record) => {
        return (
          <ButtonContainer>
            <Button onClick={() => handleClickCourseTime(record.time, 6)}>
              {t('register.choose')}
            </Button>
          </ButtonContainer>
        );
      },
    },
    {
      title: t('common.sunday'),
      dataIndex: 'courseTime',
      width: '10%',
      key: 'courseTime',
      align: 'center',

      render: (text, record) => {
        return (
          <ButtonContainer>
            <Button onClick={() => handleClickCourseTime(record.time, 0)}>
              {t('register.choose')}
            </Button>
          </ButtonContainer>
        );
      },
    },
  ];

  const dataList = [
    {
      name: t('common.morning'),
      time: [1, 2, 3, 4, 5],
    },
    {
      name: t('common.afternoon'),
      time: [6, 7, 8, 9, 10],
    },
    {
      name: t('common.night'),
      time: [11, 12, 13, 14],
    },
  ];

  const handleClickCourseTime = (time: number[], day: number) => {
    setIsOpenModal(true);
    dispatch(
      actions.getListCourseByTime({ time, day, userId: userId ? userId : 0 }),
    );
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleEnrollCourse = (listCourseId: number[]) => {
    dispatch(
      actions.enrollCourse({
        userId: userId ? +userId : 0,
        listCourseId,
      }),
    );
  };

  return (
    <Container>
      <Title>{t('common.registerCourse')}</Title>
      <Table
        isLoading={isLoading}
        columns={TABLE_COLUMNS}
        data={dataList}
        loadingIcon={loadingIcon}
        onClickRow={() => {}}
        bordered
      />
      <ModalFullScreen
        visible={isOpenModal}
        onClickCancel={handleCloseModal}
        title={t('register.listCourse')}
        nameSave={t('register.registerCourse')}
        onSave={() => handleEnrollCourse(selectedRowKeys as number[])}
      >
        <Table
          isLoading={isLoading}
          columns={TABLE_COURSE_COLUMNS}
          data={listCourse}
          onClickRow={(record: CourseType) => {
            setCourseSelected(record);
            setIsOpenModalDetail(true);
          }}
          rowSelection={rowSelection}
          loadingIcon={loadingIcon}
        />
        <ModalHandle
          onClickCancel={() => {
            setIsOpenModalDetail(false);
            setSelectedRowKeys([]);
          }}
          title={t('register.detailTitle')}
          visible={isOpenModalDetail}
          nameSave={t('register.registerCourse') as string}
          onSave={() => handleEnrollCourse([courseSelected.id])}
        >
          <>
            <DescriptionsStyled
              bordered
              title={t('course.detailTitle')}
              layout="vertical"
              column={24}
            >
              <DescriptionsStyled.Item label={t('course.id')}>
                {courseSelected.id}
              </DescriptionsStyled.Item>
              <DescriptionsStyled.Item label={t('course.name')}>
                {courseSelected.name}
              </DescriptionsStyled.Item>
              <DescriptionsStyled.Item label={t('course.shortDescription')}>
                {courseSelected.shortDescription}
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
                  <b>{t(`common.${courseSelected.weekDay.name}`)}</b>
                </div>
                <div>
                  <i>
                    {courseSelected.listPeriod
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
                    <b>{getDateFromTimeStamp(courseSelected.beginDate)}</b>
                  </div>
                  <div>
                    <i>{getDateFromTimeStamp(courseSelected.endDate)}</i>
                  </div>
                </>
              </DescriptionsStyled.Item>
            </DescriptionsStyled>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TitleStyled>{t('course.detailDescription')}</TitleStyled>
            </div>
            <DescriptionDetailContainer>
              <div
                dangerouslySetInnerHTML={{
                  __html: courseSelected.detailDescription,
                }}
                className="ql-editor"
              />
            </DescriptionDetailContainer>
          </>
        </ModalHandle>
      </ModalFullScreen>
    </Container>
  );
};

export default Register;
