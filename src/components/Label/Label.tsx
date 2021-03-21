import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
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

  useEffect(() => {
    JsBarcode($canvas.current)
      .CODE128(code, {
        height: 80,
        // displayValue: false,
      })
      .render();
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
`;

const CanvasRoot = styled.div``;
const Text = styled.div`
  font-size: 10px;
  min-height: 10px;
`;
