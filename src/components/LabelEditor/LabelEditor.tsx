import { Grid, IconButton, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/Done';
import React, { FC, FormEventHandler, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import type { ILabelProps } from '../Label';
import { Label } from '../Label';

export const LabelEditor: FC<ILabelProps> = (props) => {
  const [code, setCode] = useState(props.code);
  const [text] = useState(props.text);

  const $codeField = useRef<HTMLInputElement>(null);
  const [isCodeFormVisible, setIsCodeFormVisible] = useState(false);
  const onCodeSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
    setCode($codeField.current?.value || (undefined as any));
    setIsCodeFormVisible(false);
  }, []);
  // const hideCodeForm = useCallback(() => setIsCodeFormVisible(false), []);
  // const showCodeForm = useCallback(() => setIsCodeFormVisible(true), []);
  const onBarcodeClick = useCallback(() => {
    setIsCodeFormVisible(true);
    setTimeout(() => {
      $codeField.current?.focus();
    }, 10);
  }, []);

  return (
    <LabelEditorRoot>
      <Label code={code} text={text} onBarcodeClick={onBarcodeClick} />
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
};

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
