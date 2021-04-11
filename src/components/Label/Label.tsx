import React, { FC, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import JsBarcode from 'jsbarcode';
import { nl2br } from '../../nl2br';

export interface ILabelProps {
  code: string;
  text?: string;
  onTextClick?(): void;
  onBarcodeClick?(): void;
}

export const Label: FC<ILabelProps> = (props) => {
  const { code, text, onBarcodeClick, onTextClick } = props;
  const $canvas = useRef<HTMLCanvasElement>(null);

  const textNode = useMemo(() => (text ? nl2br(text) : null), [text]);

  useLayoutEffect(() => {
    const api = JsBarcode($canvas.current).CODE128(code, {
      height: 60,
      margin: 0,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      // displayValue: false,
    });

    const frameId = requestAnimationFrame(() => api.render());

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [code]);

  return (
    <Root>
      <Text onClick={onTextClick}>{textNode}</Text>
      <Barcode>
        <CanvasRoot onClick={onBarcodeClick}>
          <Canvas ref={$canvas} />
        </CanvasRoot>
        <Eac src={require('./EAC.svg')} />
      </Barcode>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Canvas = styled.canvas`
  width: calc(100% + 18px);
  margin: 0px -9px;
  display: block;
`;

const Eac = styled.img`
  transform: rotate(-90deg);
  height: 10mm;
  margin-left: 10px;
`;

const Barcode = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 4px;
`;

const CanvasRoot = styled.div``;
const Text = styled.div`
  font-size: 10px;
  min-height: 10px;
`;
