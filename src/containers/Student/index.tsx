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
import TableFunction from '@/shared/components/TableOtherView/TableFunction';
import loadingIcon from '@/images/loading.svg';
import { ComponentPropsType } from '@/layout/LayoutLogged';
import { Form, Tooltip } from 'antd';
import iconCloseAdvance from '@/images/iconCloseAdvance.svg';
import advanceIcon from '@/images/iconAdvance.svg';
import refreshAdvanceIcon from '@/images/iconRefeshAdvance.svg';
interface StudentType {
  id: number;
  name: string;
  address: string;
}

const Student = ({
  showAdvanceSearch,
  onCloseAdvanceSearch,
}: ComponentPropsType) => {
  const [form] = Form.useForm();
  const fakeData: StudentType[] = [
    {
      id: 1,
      name: 'VInh',
      address: 'VN',
    },
  ];
  const { t } = useTranslation();
  const TABLE_ACCOUNT = [
    {
      title: t('common.sttColumnTitle'),
      dataIndex: 'stt',
      key: 'stt',
      width: '5%',
      align: 'center',
      // render: (text, record, index) =>
      //   (dataEasySearch.currentPage - 1) * dataEasySearch.pageSize + index + 1,
      render: (text: string, record: StudentType, index: number) => index + 1,
    },
    {
      title: t('student.name'),
      dataIndex: 'studentName',
      key: 'studentName',
      width: '95%',
      render(text: string, record: StudentType) {
        console.log(text);
        return <div>{record.name}</div>;
      },
    },
    {
      title: t('partner.status'),
      dataIndex: 'profileStatusId',
      key: 'profileStatusId',
      width: 150,
      render: (text: any, record: any) => (
        <TableFunction
          type="profile"
          text={'heeel'}
          record={record}
          titleEdit={t('profile.tooltipEdit')}
          titleCopy={t('profile.tooltipCopy')}
          titleDownload={t('profile.tooltipDownload')}
          titleHistory={t('profile.tooltipHistory')}
          onClickEdit={() => {}}
          onClickCopy={() => {}}
          onClickDownload={() => {}}
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

  return (
    <Container>
      <Content>
        <ContentWrapper showAdvanceSearch={showAdvanceSearch}>
          <ContentHeader>
            <HeaderLeft>123</HeaderLeft>
            <HeaderRight>456</HeaderRight>
          </ContentHeader>
          <Table
            isLoading={false}
            columns={TABLE_ACCOUNT}
            data={fakeData}
            // @ts-ignore
            loadingIcon={loadingIcon}
            pagination
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
      </Content>
    </Container>
  );
};

export default Student;
