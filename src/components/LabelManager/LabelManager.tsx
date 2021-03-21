import React, { FC, forwardRef, KeyboardEventHandler, useCallback, useReducer, useRef, useState } from 'react';
import { useEnsuredForwardedRef } from 'react-use';
import { noop } from 'rxjs';
import styled from 'styled-components';
import { LabelEditor } from '../LabelEditor';
import { ILabelEditorRef } from '../LabelEditor/LabelEditor';
import { defaultState, reducer } from './LabelManager.reducer';

export const LabelManager: FC = () => {
  const [state, _dispatch] = useReducer(reducer, defaultState);
  const [refs] = useState<(HTMLDivElement | null)[]>([]);

  const onArrow = (i: number) => (direction: 'up' | 'down' | 'left' | 'right') => {
    let nextI = i;
    switch (direction) {
      case 'up':
        nextI -= 3;
        break;
      case 'down':
        nextI += 3;
        break;
      case 'right':
        nextI++;
        break;
      case 'left':
        nextI--;
        break;
      default:
        break;
    }

    refs[nextI]?.focus();
  };

  return (
    <Labels>
      {Array.from(Array(21)).map((_, i) => (
        <LabelRootCompoent
          key={i}
          code={state[i]?.code}
          text={state[i]?.text}
          onArrow={onArrow(i)}
          ref={{
            set current(instance: HTMLDivElement) {
              refs[i] = instance;
            },
          }}
        />
      ))}
    </Labels>
  );
};

const Labels = styled.div`
  width: 210mm;
  height: 297mm;
  display: grid;
  grid-template-columns: repeat(3, 70mm);
  grid-template-rows: repeat(7, calc(297mm / 7));
`;

const LabelRoot = styled.div`
  width: 100%;
  height: 100%;
  padding: 6mm;
  box-sizing: border-box;
`;

export interface ILabelRootCompoentProps {
  code: any;
  text: any;
  onArrow?(direction: 'up' | 'down' | 'left' | 'right'): void;
}

const LabelRootCompoent = forwardRef<HTMLDivElement, ILabelRootCompoentProps>((props, ref) => {
  const { code, text, onArrow = noop } = props;
  const $ref = useEnsuredForwardedRef<HTMLDivElement | null>(ref as any);
  const labelEditorRef = useRef<ILabelEditorRef>(null);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(async (event) => {
    if (event.target !== $ref.current) {
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
    } else if (event.code === 'ArrowUp') {
      event.preventDefault();
      onArrow('up');
    } else if (event.code === 'ArrowDown') {
      event.preventDefault();
      onArrow('down');
    } else if (event.code === 'ArrowRight') {
      event.preventDefault();
      onArrow('right');
    } else if (event.code === 'ArrowLeft') {
      onArrow('left');
      event.preventDefault();
    }
  }, []);

  return (
    <LabelRoot tabIndex={0} onKeyDown={handleKeyDown} ref={$ref}>
      <LabelEditor ref={labelEditorRef} code={code} text={text} />
    </LabelRoot>
  );
});
