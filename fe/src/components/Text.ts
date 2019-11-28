import { styled } from 'theme';

export const H1 = styled.h1`
  font-weight: bold;
  font-size: 27px;
  line-height: 33px;
`;

export const H2 = styled.h2`
  font-weight: bold;
  font-size: 21px;
  line-height: 26px;
`;

export const H3 = styled.h3`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
`;

interface ILabelProps {
  bold?: boolean;
  opacity?: boolean;
}

export const P = styled.p<ILabelProps>`
  font-size: 15px;
  line-height: 18px;
  font-weight: ${({ bold }) => (bold ? 600 : 'normal')};
  opacity: ${({ opacity }) => (opacity ? 0.5 : 1)};
`;

export const H4 = styled.h4<ILabelProps>`
  font-style: normal;
  font-weight: ${({ bold }) => (bold ? 600 : 'normal')};
  opacity: ${({ opacity }) => (opacity ? 0.5 : 1)};
  font-size: 15px;
  line-height: 18px;
`;

export const Label = styled.label<ILabelProps>`
  font-size: 12px;
  line-height: 15px;
  font-weight: ${({ bold }) => (bold ? 600 : 'normal')};
`;

export const TabLink = styled.h3`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

export const H5 = styled.h5<ILabelProps>`
  font-size: 12px;
  line-height: 15px;
  font-weight: ${({ bold }) => (bold ? 600 : 'normal')};
  opacity: ${({ opacity }) => (opacity ? 0.5 : 1)};
`;
