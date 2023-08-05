import styled from 'styled-components';

export const Container = styled.div`
  padding: 50px 20px;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.extraLarge};
`;

export const LabelCourseTime = styled.div`
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
