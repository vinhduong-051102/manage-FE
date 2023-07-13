import React, { useState } from 'react';
import { FloatingLabel, FloatLabel, Label } from './style';
import { RedStar } from '@/shared/components/FloatingLabel/styled';

interface PropsType {
  children: any;
  label: string;
  value: string;
  isRequired?: boolean;
}

const Floating = ({ children, label, value, isRequired }: PropsType) => {
  const [focus, setFocus] = useState(false);
  return (
    <FloatLabel
      onBlur={() => {
        setFocus(false);
      }}
      onFocus={() => {
        setFocus(true);
      }}
    >
      {children}
      {focus || (value && value.length !== 0) ? (
        <FloatingLabel>
          {isRequired ? (
            <>
              {label}
              <RedStar>*</RedStar>
            </>
          ) : (
            <>{label}</>
          )}
        </FloatingLabel>
      ) : (
        <Label>
          {isRequired ? (
            <>
              {label}
              <RedStar>*</RedStar>
            </>
          ) : (
            <>{label}</>
          )}
        </Label>
      )}
    </FloatLabel>
  );
};

export default Floating;
