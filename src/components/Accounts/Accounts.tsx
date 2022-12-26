import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils';
import {
  ColumnDef,
  createColumnHelper,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingFn,
  sortingFns,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { clsx } from 'clsx';
import React from 'react';
import {
  HiArrowUp,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';

import { DebouncedInput } from '../DebouncedInput';
import Pagination from '../Pagination';
import TotalReport from '~/components/TotalReport';
import totalReport from '~/components/TotalReport';
import { TotalReportType } from '~/screens/ProductsDashboard';
import { numberWithCommas } from '~/utils/common';

export type Product = {
  id: number;
  advertiser_id: string;
  name: string;
  timezone: string;
  display_timezone: string;
  status: string;
  total_cost: number;
  clicks: number;
  conversion_rate: number;
  conversions: number;
  cpm: number;
  cpc: number;
  ctr: number;
  cpa: number;
  impressions: number;
  company: string;
  status_code: string;
  revenue: number;
  profit: number;
  roi: number;
  currency: string;
};

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!,
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
type Props = {
  products: Product[];
  accountsReport: TotalReportType;
};
const Accounts = ({ products, accountsReport }: any) => {
  const columnHelper = createColumnHelper<Product>();
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'totalCost',
      desc: true,
    },
  ]);
  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      id: 'name',
      cell: (info) => {
        const { name } = info.row.original;
        return <div>{name}</div>;
      },
    }),
    columnHelper.accessor('total_cost', {
      header: 'Total Cost',
      id: 'totalCost',
      cell: (info) => {
        const { total_cost } = info.row.original;
        return (
          <div>
            {numberWithCommas(total_cost)}&nbsp;
            {info.row.original.currency}
          </div>
        );
      },
    }),
    columnHelper.accessor('clicks', {
      header: 'Clicks',
      cell: (info) => {
        const { clicks } = info.row.original;
        return <div>{numberWithCommas(clicks)}</div>;
      },
    }),
    columnHelper.accessor('conversion_rate', {
      header: 'Conversion Rate',
      cell: (info) => {
        const { conversion_rate } = info.row.original;
        return <div>{numberWithCommas(conversion_rate)} %</div>;
      },
    }),
    columnHelper.accessor('cpa', {
      header: 'CPA',
      cell: (info) => {
        const { cpa } = info.row.original;
        return <div>{numberWithCommas(cpa)}</div>;
      },
    }),
    columnHelper.accessor('revenue', {
      header: 'Revenue',
      cell: (info) => {
        const { revenue } = info.row.original;
        return <div>{numberWithCommas(revenue)} USD</div>;
      },
    }),
    columnHelper.accessor('profit', {
      header: 'Profit',
      cell: (info) => {
        const { profit } = info.row.original;
        return <div>{numberWithCommas(profit)} USD</div>;
      },
    }),
  ];
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data: products,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter,
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });
  return (
    <div className="mt-2 flex flex-col">
      <section className="mt-5 mb-4 flex w-full">
        <div className="w-full">
          <label htmlFor="search-account" className="sr-only">
            Search
          </label>
          <DebouncedInput
            type="text"
            name="search-account"
            id="search-account"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search"
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
          />
        </div>
      </section>
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
        <div className="inline-block min-w-full py-2 px-2 align-middle md:px-6 lg:px-8">
          <div className="h-[36rem] overflow-y-auto overflow-x-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="table_container">
              <thead className="table_head">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: clsx(
                                {
                                  'cursor-pointer select-none flex items-center gap-2':
                                    header.column.getCanSort(),
                                },
                                'group',
                              ),
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {{
                              asc: (
                                <span className=" ml-2 flex-none transform rounded bg-gray-200 text-gray-900 transition-all group-hover:bg-gray-300">
                                  <HiChevronDown
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ),
                              desc: (
                                <span className="ml-2 flex-none rotate-180 transform rounded bg-gray-200 text-gray-900 transition-all  group-hover:bg-gray-300">
                                  <HiChevronDown
                                    className="h-5 w-5 "
                                    aria-hidden="true"
                                  />
                                </span>
                              ),
                            }[header.column.getIsSorted() as string] ?? (
                              <span className="invisible ml-2 flex-none rounded text-gray-400 transition-all group-hover:visible group-focus:visible">
                                <HiChevronDown
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="table_body">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              {accountsReport ? <TotalReport data={accountsReport} /> : null}
            </table>
          </div>
        </div>

        {/* <Pagination
          from={
            table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
            1
          }
          to={
            (table.getState().pagination.pageIndex + 1) *
            table.getState().pagination.pageSize
          }
          totalItems={table.getPrePaginationRowModel().rows.length}
          itemsPerPage={10}
          currentPage={table.getState().pagination.pageIndex}
          onPageChange={table.setPageIndex}
        /> */}
      </div>
    </div>
  );
};

export default Accounts;
