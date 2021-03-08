import React, { FC, useReducer } from 'react';
import styled from 'styled-components';
import { LabelEditor } from '../LabelEditor';
import { reducer, defaultState } from './LabelManager.reducer';

export const LabelManager: FC = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <Labels>
      {Array.from(Array(21)).map((_, i) => (
        <LabelRoot key={i} tabIndex={0}>
          <LabelEditor code={state[i]?.code} text={state[i]?.text} />
        </LabelRoot>
      ))}
    </Labels>
  );
};

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
  /* &:focus {
    border: 2px solid blue;
  } */
`;
