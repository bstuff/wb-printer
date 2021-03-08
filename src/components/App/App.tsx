import React, { FC } from 'react';
import { LabelManager } from '../LabelManager';
import styled from 'styled-components';

export const App: FC = () => (
  <div>
    <Top>WB labels</Top>
    <LabelManager />
  </div>
);

const Top = styled.div`
  @media print {
    display: none;
  }
`;
