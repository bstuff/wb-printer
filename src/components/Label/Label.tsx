import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import JsBarcode from 'jsbarcode';
import { nl2br } from '../../nl2br';

export const Label: FC = () => {
  const $canvas = useRef<HTMLCanvasElement>(null);
  const [code] = useState('2001211906004');
  const [text] = useState('Залупа конская в ассортименте\nРазмер: XL\nПроизводитель: ИП Лебедев Артемий Татьянович');

  const textNode = useMemo(() => nl2br(text), [text]);

  useEffect(() => {
    JsBarcode($canvas.current)
      .CODE128(code, {
        height: 80,
        // displayValue: false,
      })
      .render();
  }, []);

  return (
    <Root>
      <Text>{textNode}</Text>
      <Barcode>
        <CanvasRoot>
          <Canvas ref={$canvas} />
          <div></div>
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
`;
