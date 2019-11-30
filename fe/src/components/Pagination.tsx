import * as React from 'react';

import { H4, Button } from 'components';
import { styled } from 'theme';

const ButtonsWrapper = styled.div`
  display: flex;
  z-index: 1;

  .button {
    height: 30px;
    padding: 0;
    width: 80px;
  }
`;

const PageNumber = styled(H4)<{ isActive?: boolean }>`
  padding: 0 5px;
  margin: 0 10px;
  cursor: pointer;

  ${({ isActive, theme }) =>
    isActive
      ? `
    color: ${theme.color.primary};
    border-bottom: 1px solid ${theme.color.primary};
  `
      : `
    color: ${theme.color.gray};
    border-bottom: 1px solid transperent;
  `}
`;

interface IPagination {
  totalPages: number;
  firstActivePage?: number;
  className?: string;
  onPageChange: (val: number) => void;
}

export const Pagination: React.FC<IPagination> = ({ totalPages, firstActivePage, className, onPageChange }) => {
  const [activePage, setActivePage] = React.useState<number>(firstActivePage || 1);
  const [isRightClick, setRightClick] = React.useState<boolean>(true);

  const [firstValue, setFirstValue] = React.useState<number>(firstActivePage || 1);
  const [secondValue, setSecondValue] = React.useState<number>(firstValue + 1);
  const [thirdValue, setThirdValue] = React.useState<number>(secondValue + 1);
  const [fourthValue, setFourthValue] = React.useState<number>(totalPages);

  React.useEffect(() => {
    setFourthValue(totalPages);
    setActivePage(1);
    setFirstValue(1);
  }, [totalPages]);

  React.useEffect(() => {
    if (activePage === totalPages - 3 && !isRightClick) {
      setFirstValue(1);
      setSecondValue(totalPages - 4);
      setThirdValue(totalPages - 3);
      setFourthValue(totalPages - 2);
    }

    if (activePage === 4 && isRightClick) {
      setFirstValue(3);
      setSecondValue(4);
      setThirdValue(5);
      if (!isRightClick) {
        setFirstValue(1);
      }
    }

    if (activePage === thirdValue && thirdValue !== totalPages - 1 && totalPages !== 3) {
      setFirstValue(secondValue);
      setSecondValue(thirdValue);
      setThirdValue(thirdValue + 1);
      setRightClick(true);
    }

    if (activePage === firstValue && firstValue !== 1) {
      setFirstValue(1);
      setSecondValue(firstValue - 1);
      setThirdValue(firstValue);
      setFourthValue(secondValue);
      setRightClick(false);
    }

    if (activePage === secondValue && secondValue !== 2) {
      setSecondValue(secondValue - 1);
      setThirdValue(secondValue);
      setFourthValue(thirdValue);
      setRightClick(false);
    }

    if (activePage === fourthValue && fourthValue !== totalPages) {
      setFirstValue(thirdValue);
      setSecondValue(fourthValue);
      setThirdValue(fourthValue + 1);
      setFourthValue(totalPages);
      setRightClick(true);
    }

    if ((activePage === totalPages || activePage === totalPages - 1) && totalPages !== 3) {
      setFirstValue(1);
      setSecondValue(totalPages - 2);
      setThirdValue(totalPages - 1);
      setRightClick(false);
    }

    if (activePage === 1 || activePage === 2) {
      setSecondValue(2);
      setThirdValue(3);
      setFourthValue(totalPages);
      setRightClick(true);
    }

    if (activePage === 3 && totalPages !== 3 && !isRightClick) {
      setFourthValue(totalPages);
      setRightClick(true);
    }

    if (activePage === totalPages - 2 && isRightClick) {
      setFirstValue(1);
      setRightClick(false);
    }
  }, [activePage]);

  return (
    <ButtonsWrapper className={className}>
      <Button
        className="button"
        onClick={() => {
          if (activePage !== 1) {
            setActivePage(activePage - 1);
            onPageChange(activePage - 1);
          }
        }}
        disabled={activePage === 1}
      >
        Previous
      </Button>
      <PageNumber
        isActive={activePage === firstValue}
        onClick={() => {
          if (activePage !== firstValue) {
            setActivePage(firstValue);
            onPageChange(firstValue);
          }
        }}
      >
        {firstValue}
      </PageNumber>
      {!isRightClick && activePage !== 1 && totalPages > 4 && <PageNumber>...</PageNumber>}
      {totalPages > 1 && (
        <PageNumber
          isActive={activePage === secondValue}
          onClick={() => {
            if (activePage !== secondValue) {
              setActivePage(secondValue);
              onPageChange(secondValue);
            }
          }}
        >
          {secondValue}
        </PageNumber>
      )}
      {totalPages > 2 && (
        <PageNumber
          isActive={activePage === thirdValue}
          onClick={() => {
            if (activePage !== thirdValue) {
              setActivePage(thirdValue);
              onPageChange(thirdValue);
            }
          }}
        >
          {thirdValue}
        </PageNumber>
      )}
      {isRightClick && activePage !== totalPages - 1 && totalPages > 4 && <PageNumber>...</PageNumber>}
      {totalPages > 3 && (
        <PageNumber
          isActive={activePage === fourthValue}
          onClick={() => {
            if (activePage !== fourthValue) {
              setActivePage(fourthValue);
              onPageChange(fourthValue);
            }
          }}
        >
          {fourthValue}
        </PageNumber>
      )}
      <Button
        className="button"
        onClick={() => {
          if (activePage !== fourthValue) {
            setActivePage(activePage + 1);
            onPageChange(activePage + 1);
          }
        }}
        disabled={activePage === totalPages}
      >
        Next
      </Button>
    </ButtonsWrapper>
  );
};
