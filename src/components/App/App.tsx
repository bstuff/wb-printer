import React, { FC } from 'react';
import { Label } from '../Label';
import styled from 'styled-components';

export const App: FC = () => (
  <div>
    <Top>WB labels</Top>
    <Labels>
      {Array.from(Array(21)).map((_, i) => (
        <Label key={i} />
      ))}
    </Labels>
  </div>
);

const Labels = styled.div`
  width: 210mm;
  max-height: 297mm;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(7, 1fr);
`;

const Top = styled.div`
  @media print {
    display: none;
  }
`;
