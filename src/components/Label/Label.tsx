import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import JsBarcode from 'jsbarcode';

export const Label: FC = () => {
  const $canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    JsBarcode($canvas.current).CODE128('2001211906004', {}).render();
  }, []);

  return (
    <Root>
      <Canvas ref={$canvas} />
    </Root>
  );
};

const Root = styled.div`
  width: 70mm;
  height: calc(297mm / 7);
  border: 1px solid black;
  box-sizing: border-box;
`;

const Canvas = styled.canvas`
  width: 90%;
  margin: 0 auto;
  display: block;
`;
