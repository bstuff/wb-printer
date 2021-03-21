import { Grid, IconButton, TextField, TextareaAutosize } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/Done';
import React, { FC, FormEventHandler, forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import type { ILabelProps } from '../Label';
import { Label } from '../Label';

type CopyPasteValue = Pick<ILabelProps, 'code' | 'text'>;

export interface ILabelEditorRef {
  copy(): CopyPasteValue;
  paste(v: CopyPasteValue): void;
}

export const LabelEditor = forwardRef<ILabelEditorRef, ILabelProps>((props, ref) => {
  const [code, setCode] = useState(props.code);
  const [text, setText] = useState(props.text);

  useImperativeHandle(ref, () => {
    return {
      copy() {
        return {
          code,
          text,
        };
      },
      paste({ code, text }) {
        setCode(code);
        (text || text === '') && setText(text);
      },
    };
  });

  const $codeField = useRef<HTMLInputElement>(null);
  const [isCodeFormVisible, setIsCodeFormVisible] = useState(false);
  const onCodeSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
    setCode($codeField.current?.value || (undefined as any));
    setIsCodeFormVisible(false);
  }, []);
  const onBarcodeClick = useCallback(() => {
    setIsCodeFormVisible(true);
    setTimeout(() => {
      $codeField.current?.focus();
    }, 10);
  }, []);

  const $descField = useRef<HTMLInputElement>(null);
  const [isDescFormVisible, setIsDescFormVisible] = useState(false);
  const onDescSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
    setText($descField.current?.value || (undefined as any));
    setIsDescFormVisible(false);
  }, []);
  const onTextClick = useCallback(() => {
    setIsDescFormVisible(true);
    setTimeout(() => {
      $codeField.current?.focus();
    }, 10);
  }, []);

  return (
    <LabelEditorRoot>
      <Label code={code} text={text} onBarcodeClick={onBarcodeClick} onTextClick={onTextClick} />
      {isDescFormVisible && (
        <CodeFieldForm onSubmit={onDescSubmit}>
          <Grid container spacing={1} alignItems="center" wrap="nowrap">
            <Grid item>
              <TextField
                inputRef={$descField}
                variant="outlined"
                label="Description"
                size="small"
                multiline
                defaultValue={text}
                rows={4}
              />
            </Grid>
            <Grid item>
              <IconButton color="primary" size="small" type="submit">
                <AccountCircle />
              </IconButton>
            </Grid>
          </Grid>
        </CodeFieldForm>
      )}
      {isCodeFormVisible && (
        <CodeFieldForm onSubmit={onCodeSubmit}>
          <Grid container spacing={1} alignItems="center" wrap="nowrap">
            <Grid item>
              <TextField inputRef={$codeField} variant="outlined" label="code" size="small" defaultValue={props.code} />
            </Grid>
            <Grid item>
              <IconButton color="primary" size="small" type="submit">
                <AccountCircle />
              </IconButton>
            </Grid>
          </Grid>
        </CodeFieldForm>
      )}
    </LabelEditorRoot>
  );
});

const LabelEditorRoot = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CodeFieldForm = styled.form`
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 5px 5px #fff;

  @media print {
    display: none;
  }
`;
