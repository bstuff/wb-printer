import { createAction, createReducer } from '@reduxjs/toolkit';

export const setCode = createAction<{ idx: number; code: string }>('setCode');

type LabelState = {
  code: string;
  text?: string;
};

export const defaultState: LabelState[] = [
  {
    code: '2001211906004',
    text: 'hello world',
  },
  {
    code: '2001211906004',
    text: 'hello world',
  },
  {
    code: '2001211906004',
    text: 'hello world',
  },
  {
    code: '2001211906004',
    text: 'hello world',
  },
];

export const reducer = createReducer<LabelState[]>(defaultState, (builder) => {
  builder.addCase(setCode, (state, { payload }) => {
    state[payload.idx].code = payload.code;
  });
});
