import React, { useCallback } from 'react';
import { Box, Button } from '@chakra-ui/react';

type Props = {
  page: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  totalPages: number;
};

export const TwoButtonsPagination: React.FC<Props> = ({
  page,
  onPrevPage,
  onNextPage,
  totalPages,
}) => {
  const isLastPage = useCallback(
    (currentPage) => {
      return currentPage === totalPages;
    },
    [totalPages]
  );
  return (
    <Box
      display={!isLastPage(page) && page !== 1 ? 'flex' : 'block'}
      justifyContent="space-evenly"
    >
      {page !== 1 && (
        <Button
          onClick={onPrevPage}
          width={isLastPage(page) ? '95%' : '45%'}
          marginX={isLastPage(page) ? '0.3rem' : ''}
          size={'sm'}
        >
          Назад
        </Button>
      )}
      {!isLastPage(page) && (
        <Button
          onClick={onNextPage}
          width={page === 1 ? '95%' : '45%'}
          marginX={page === 1 ? '0.3rem' : ''}
          size={'sm'}
        >
          Вперед
        </Button>
      )}
    </Box>
  );
};
