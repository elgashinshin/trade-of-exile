import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { chakra, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useSortBy, useTable } from 'react-table';
import React from 'react';
import StatusBadge from '../../../components/Elements/StatusBadge/StatusBadge';

const History = () => {
  const data = React.useMemo(
    () => [
      {
        soldItem: 'Сфера златокузнеца',
        soldTime: '01.01.2022',
        price: 1,
        status: 0,
      },
      {
        soldItem: 'feet',
        soldTime: '01.01.2022',
        price: 2,
        status: 0,
      },
      {
        soldItem: 'yards',
        soldTime: '01.01.2022',
        price: 3,
        status: 0,
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Проданный предмет',
        accessor: 'soldItem',
      },
      {
        Header: 'Время продажи',
        accessor: 'soldTime',
      },
      {
        Header: 'Стоимость',
        accessor: 'price',
        isNumeric: true,
      },
      {
        Header: 'Статус',
        accessor: 'status',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <StatusBadge status={2} />
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default History;
