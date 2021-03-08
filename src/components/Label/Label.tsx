import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import JsBarcode from 'jsbarcode';
import { nl2br } from '../../nl2br';

interface LabelProps {
  code: string;
  text?: string;
}

export const Label: FC<LabelProps> = (props) => {
  const { code, text } = props;
  const $canvas = useRef<HTMLCanvasElement>(null);
  // const [code] = useState('2001211906004');
  // const [text] = useState('Залупа конская в ассортименте\nРазмер: XL\nПроизводитель: ИП Лебедев Артемий Татьянович');

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
      <Text>{textNode}</Text>
      <Barcode>
        <CanvasRoot>
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
`;
