import { styled, css } from 'theme';

export const sharedStyle = css`
  font-size: 14px;
  font-style: normal;
  font-stretch: normal;
  white-space: nowrap;
  line-height: 17px;
  letter-spacing: normal;
  cursor: pointer;
  border: 0;
  outline: 0;
`;

export const Button = styled.button`
  ${sharedStyle}

  height: 38px;
  padding: 8px 15px;
  text-align: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};

  &:hover {
    background-color: ${({ theme }) => theme.color.darkPrimary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const TextButton = styled.button`
  ${sharedStyle}

  height: 38px;
  padding: 8px 15px;
  text-align: center;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.white};

  &:hover {
    background-color: ${({ theme }) => theme.color.lightGrey};
    color: ${({ theme }) => theme.color.darkPrimary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
