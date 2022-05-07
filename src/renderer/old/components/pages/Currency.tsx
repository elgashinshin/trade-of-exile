import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import PathOfExileState from '../../../stores/PathOfExileState';
import TwoButtonsPagination from '../../../components/Elements/TwoButtonsPagination/TwoButtonsPagination';
import Card from '../../../components/Elements/Card/Card';

type Props = {
  currencyCategory: { id: string; label: string }[] | [];
};

const pathOfExileState = new PathOfExileState();
const itemsPerPage = 8;

const Currency: React.FC<Props> = ({ currencyCategory }) => {
  const [category, setCategory] = useState('Currency');
  const [page, setPage] = useState(0);

  const list = useMemo(() => {
    return pathOfExileState.getCurrencyById(category);
  }, [category]);

  const totalPages = useMemo(() => {
    return Math.ceil(currencyCategory.length / itemsPerPage);
  }, [currencyCategory]);

  const onChangeCategory = useCallback((id: string) => {
    setCategory(id);
  }, []);

  const onNextPage = useCallback(() => {
    setPage((state) => state + 1);
  }, []);

  const onPrevPage = useCallback(() => {
    setPage((state) => state - 1);
  }, []);

  const getCurrencyCategoryListByPage = useCallback(
    (currentPage: number) => {
      const currentPageIndex = currentPage - 1;

      if (currentPageIndex === 0) {
        return currencyCategory.slice(0, itemsPerPage);
      }

      return currencyCategory.slice(
        currentPageIndex * itemsPerPage,
        currentPageIndex * itemsPerPage + itemsPerPage
      );
    },
    [currencyCategory]
  );

  return (
    <div>
      <Menu>
        <MenuButton
          as={Button}
          marginBottom={3}
          rightIcon={<ChevronDownIcon />}
        >
          {category}
        </MenuButton>
        <MenuList>
          <Box marginBottom={2}>
            {getCurrencyCategoryListByPage(page).map((item) => (
              <>
                {item.label ? (
                  <MenuItem
                    key={item.id}
                    isDisabled={item.id === category}
                    onClick={() => onChangeCategory(item.id)}
                  >
                    {item.label}
                  </MenuItem>
                ) : (
                  ''
                )}
              </>
            ))}
          </Box>

          <TwoButtonsPagination
            page={page}
            onNextPage={onNextPage}
            onPrevPage={onPrevPage}
            totalPages={totalPages}
          />
        </MenuList>
      </Menu>
      <Wrap>
        {list.map((item) => (
          <WrapItem key={item.id}>
            <Card
              alt={item.id}
              text={item.text}
              imageUrl={`https://www.pathofexile.com${item.image}`}
            />
          </WrapItem>
        ))}
      </Wrap>
    </div>
  );
};

export default observer(Currency);
