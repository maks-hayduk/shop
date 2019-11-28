import { css, FlattenSimpleInterpolation } from 'styled-components';

interface ISizes {
  [key: string]: number;
}

export const sizes: ISizes = {
  tablet: 722
};

export const media = Object.keys(sizes).reduce(
  (acc, label) => {
    acc[label] = (literals: TemplateStringsArray, ...placeholders: string[]) => css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css(literals, ...placeholders)}
      }
    `;
    return acc;
  },
  // tslint:disable-next-line
  {} as Record<keyof typeof sizes, (l: TemplateStringsArray, ...p: string[]) => FlattenSimpleInterpolation>
);
