import styled from 'styled-components';
import ReactQuill from 'react-quill';

export const Container = styled.div`
  padding: 20px;
`;

export const ReactQuillStyled = styled(ReactQuill)`
  & .ql-toolbar {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
  & .ql-container {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
