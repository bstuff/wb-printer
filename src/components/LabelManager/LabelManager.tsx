import React, { FC, KeyboardEventHandler, useCallback, useReducer, useRef } from 'react';
import styled from 'styled-components';
import { LabelEditor } from '../LabelEditor';
import { ILabelEditorRef } from '../LabelEditor/LabelEditor';
import { reducer, defaultState } from './LabelManager.reducer';

export const LabelManager: FC = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <Labels>
      {Array.from(Array(21)).map((_, i) => (
        <LabelRootCompoent key={i} code={state[i]?.code} text={state[i]?.text} />
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

const LabelRootCompoent: FC<{ code: any; text: any }> = (props) => {
  const { code, text } = props;
  const ref = useRef<HTMLDivElement>(null);
  const labelEditorRef = useRef<ILabelEditorRef>(null);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(async (event) => {
    if (event.target !== ref.current) {
      return;
    }
    let charCode = event.key.toLowerCase();

    if (event.metaKey && charCode === 'c') {
      navigator.clipboard.writeText(JSON.stringify(labelEditorRef.current!.copy()));
    } else if (event.metaKey && charCode === 'v') {
      const clipboardData = await navigator.clipboard.readText();
      if (!clipboardData) {
        return;
      }

      try {
        const data = JSON.parse(clipboardData);
        if ('code' in data) {
          labelEditorRef.current!.paste({
            text: data.text,
            code: data.code,
          });
        }
      } catch (err) {
        if (clipboardData.length < 16) {
          labelEditorRef.current!.paste({ code: clipboardData });
        }
      }
      console.log('Cmd + V pressed', clipboardData);
    }
  }, []);

  return (
    <LabelRoot tabIndex={0} onKeyDown={handleKeyDown} ref={ref}>
      <LabelEditor ref={labelEditorRef} code={code} text={text} />
    </LabelRoot>
  );
};
