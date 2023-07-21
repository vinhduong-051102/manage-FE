import { StudentType } from '@/containers/Student';
import {
  DescriptionsStyled,
  StatusLabel,
  TableContainer,
  FilterContainer,
} from '@/containers/Student/components/ViewDetail/style';
import { useTranslation } from 'react-i18next';
import SelectFloat from '@/shared/components/FloatingLabel/SelectFloat';
import { useState } from 'react';
import Table from '@/shared/components/Table';

const ViewDetail = ({ data }: { data: StudentType }) => {
  const [t] = useTranslation();
  const { id, isActive, locationString, email, name } = data;

  const [courseType, setCourseType] = useState<'0' | '1'>('0');

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
    </>
  );
};

export default ViewDetail;
