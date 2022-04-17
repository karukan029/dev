// style-utils.jsというutilsを作る
import { css } from 'styled-components';

const media = {
  handheld769: (...args) => css`
    @media (min-width: 769px) {
      //769px以上
      ${css(...args)}
    }
  `,
  handheld426: (...args) => css`
    @media (min-width: 426px) {
      //426px以上
      ${css(...args)}
    }
  `,
  handheld376: (...args) => css`
    @media (min-width: 376px) {
      //376px以上
      ${css(...args)}
    }
  `,
};

export default media;
