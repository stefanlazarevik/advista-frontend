import { rankItem } from '@tanstack/match-sorter-utils';
import {
  createColumnHelper,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { clsx } from 'clsx';
import React, { SetStateAction } from 'react';
import { HiChevronDown } from 'react-icons/hi';

import { DebouncedInput } from '~/components/DebouncedInput';
import TotalReport from '~/components/TotalReport';
import { numberWithCommas } from '~/utils/common';
import { TableHeader, TotalReportType, VerticalsType } from '~/utils/interface';
import { verticalsColumn } from '~/components/ProductView/tableData';
import FilterWidget from '~/components/FilterWidget';

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
type Props = {
  verticals: VerticalsType[];
  verticalsReport: TotalReportType;
  tableHeader: TableHeader[];
  setTableHeader: React.Dispatch<SetStateAction<TableHeader[]>>;
  verticalsSearchFilter?: string;
  setVerticalsSearchFilter: React.Dispatch<SetStateAction<string>>;
};
const Verticals = ({
  verticals,
  verticalsReport,
  tableHeader,
  setTableHeader,
  verticalsSearchFilter,
  setVerticalsSearchFilter,
}: Props) => {
  const columnHelper = createColumnHelper<VerticalsType>();
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'total_cost',
      desc: true,
    },
  ]);
  const tableColumn = verticalsColumn;
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
      id: 'total_cost',
      cell: (info) => {
        const { total_cost } = info.row.original;
        return <div>{numberWithCommas(total_cost)}&nbsp; &nbsp; EUR</div>;
      },
    }),
    columnHelper.accessor('clicks', {
      id: 'clicks',
      header: 'Clicks',
      cell: (info) => {
        const { clicks } = info.row.original;
        return <div>{numberWithCommas(clicks)}</div>;
      },
    }),
    columnHelper.accessor('conversion_rate', {
      id: 'conversion_rate',
      header: 'CVR (%)',
      cell: (info) => {
        const { conversion_rate } = info.row.original;
        return <div>{numberWithCommas(conversion_rate)} %</div>;
      },
    }),
    columnHelper.accessor('cpa', {
      id: 'cpa',
      header: 'CPA',
      cell: (info) => {
        const { cpa } = info.row.original;
        return <div>{numberWithCommas(cpa)}</div>;
      },
    }),
    columnHelper.accessor('revenue', {
      id: 'revenue',
      header: 'Revenue',
      cell: (info) => {
        const { revenue } = info.row.original;
        return <div>{numberWithCommas(revenue)} USD</div>;
      },
    }),
    columnHelper.accessor('roi', {
      id: 'roi',
      header: 'ROI (%)',
      cell: (info) => {
        const { roi } = info.row.original;
        return <div>{numberWithCommas(roi)} %</div>;
      },
    }),
    columnHelper.accessor('profit', {
      id: 'profit',
      header: 'Profit',
      cell: (info) => {
        const { profit } = info.row.original;
        return <div>{numberWithCommas(profit)} USD</div>;
      },
    }),
  ];
  const checkFilterValue = (key: string) => {
    const found = tableHeader.find((header) => header?.key === key);
    return !!found;
  };
  const table = useReactTable({
    data: verticals,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      columnVisibility: {
        total_cost: checkFilterValue('total_cost'),
        profit: checkFilterValue('profit'),
        revenue: checkFilterValue('revenue'),
        clicks: checkFilterValue('clicks'),
        cpa: checkFilterValue('cpa'),
        conversion_rate: checkFilterValue('conversion_rate'),
        roi: checkFilterValue('roi'),
      },
    },
    initialState: {
      columnVisibility: {
        total_cost: checkFilterValue('total_cost'),
        profit: checkFilterValue('profit'),
        revenue: checkFilterValue('revenue'),
        conversion_rate: checkFilterValue('conversion_rate'),
        clicks: checkFilterValue('clicks'),
        cpa: checkFilterValue('cpa'),
        roi: checkFilterValue('roi'),
      },
    },
    onSortingChange: setSorting,
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
      <section className="mt-5 mb-4 flex w-full gap-4">
        <div className="w-full">
          <label htmlFor="search-account" className="sr-only">
            Search
          </label>
          <DebouncedInput
            type="text"
            name="search-account"
            id="search-account"
            className="block w-full rounded-md border-gray-300 bg-gray-50 py-3 shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 sm:text-sm"
            placeholder="Search"
            value={verticalsSearchFilter ?? ''}
            onChange={(value) => setVerticalsSearchFilter(String(value))}
          />
        </div>
        <div className="">
          <FilterWidget
            tableColumn={tableColumn}
            tableHeader={tableHeader}
            setTableHeader={setTableHeader}
          />
        </div>
      </section>
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                                  'cursor-pointer select-none flex items-center gap-2 group':
                                    header.column.getCanSort(),
                                },
                                'group',
                              ),
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {}
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}

                            {{
                              asc: (
                                <span className="ml-2 flex-none transform rounded bg-gray-200 text-gray-900 transition-all group-hover:bg-gray-300">
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
              {verticalsReport ? (
                <TotalReport data={verticalsReport} tableHeader={tableHeader} />
              ) : null}
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

export default Verticals;
