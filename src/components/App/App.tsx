import React, { FC } from 'react';
import { Label } from '../Label';
import styled from 'styled-components';

export const App: FC = () => (
  <div>
    <Top>WB labels</Top>
    <Labels>
      {Array.from(Array(21)).map((_, i) => (
        <LabelRoot key={i}>
          <Label />
        </LabelRoot>
      ))}
    </Labels>
  </div>
);

const Labels = styled.div`
  width: 210mm;
  height: 297mm;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(7, 1fr);
`;

const LabelRoot = styled.div`
  width: 100%;
  height: 100%;
  padding: 6mm;
  /* border: 1px solid yellow; */
  box-sizing: border-box;
`;

const Top = styled.div`
  @media print {
    display: none;
  }
`;
