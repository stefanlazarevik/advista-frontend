// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// import React from 'react';
//

// const Verticals = ({ verticals }: Props) => {
//   const columnHelper = createColumnHelper<VerticalsType>();
//   const columns = [
//     columnHelper.display({
//       id: 'name',
//       header: 'Name',
//       cell: (info) => {
//         const { details } = info.row.original;
//         return <div>{details?.name}</div>;
//       },
//     }),
//     columnHelper.display({
//       id: 'total_cost',
//       header: 'Total Cost',
//       cell: (info) => {
//         const { total_cost } = info.row.original;
//         return <div>{total_cost}</div>;
//       },
//     }),
//     columnHelper.display({
//       id: 'clicks',
//       header: 'Clicks',
//       cell: (info) => {
//         const { clicks } = info.row.original;
//         return <div>{clicks}</div>;
//       },
//     }),
//     columnHelper.display({
//       id: 'conversion_rate',
//       header: 'Conversion Rate',
//       cell: (info) => {
//         const { conversion_rate } = info.row.original;
//         return <div>{conversion_rate}</div>;
//       },
//     }),
//     columnHelper.display({
//       id: 'cpa',
//       header: 'CPA',
//       cell: (info) => {
//         const { cpa } = info.row.original;
//         return <div>{cpa}</div>;
//       },
//     }),
//     columnHelper.display({
//       id: 'revenue',
//       header: 'Revenue',
//       cell: (info) => {
//         const { revenue } = info.row.original;
//         return <div>{revenue}</div>;
//       },
//     }),
//     columnHelper.display({
//       id: 'profit',
//       header: 'Profit',
//       cell: (info) => {
//         const { profit } = info.row.original;
//         return <div>{profit}</div>;
//       },
//     }),
//   ];
//
//   const table = useReactTable({
//     data: verticals,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     filterFns: undefined,
//   });
//   return (
//     <div className="mt-8 flex flex-col">
//       <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
//         <div className="inline-block min-w-full py-2 px-2 align-middle md:px-6 lg:px-8">
//           <div className="overflow-x-hidden overflow-y-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg h-[36rem]">
//             <table className="table_container">
//               <thead className="table_head">
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <tr key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => (
//                       <th key={header.id}>
//                         {header.isPlaceholder
//                           ? null
//                           : flexRender(
//                               header.column.columnDef.header,
//                               header.getContext(),
//                             )}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody className="table_body">
//                 {table.getRowModel().rows.map((row) => (
//                   <tr key={row.id}>
//                     {row.getVisibleCells().map((cell) => (
//                       <td key={cell.id}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext(),
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Verticals;

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

import { DebouncedInput } from '~/components/DebouncedInput';
import Pagination from '~/components/Pagination';

export type VerticalsType = {
  id: number;
  details: {
    url: string[];
    name: string;
    stats: string[];
    source: string[];
    domains: string[];
    category: string;
  };
  vertical_id: string;
  created_time: string;
  conversion_rate: number;
  total_cost: number;
  clicks: number;
  conversions: number;
  impressions: number;
  name: string;
  ctr: number;
  cpm: number;
  cpc: number;
  cpa: number;
  revenue: number;
  profit: number;
  roi: number;
};
type Props = {
  verticals: VerticalsType[];
};

// declare module '@tanstack/table-core' {
//   interface FilterFns {
//     fuzzy: FilterFn<unknown>;
//   }
//   interface FilterMeta {
//     itemRank: RankingInfo;
//   }
// }

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
// type Props = {
//   products: Product[];
// };
const Verticals = ({ verticals }: Props) => {
  const columnHelper = createColumnHelper<VerticalsType>();
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
        return <div>{total_cost}</div>;
      },
    }),
    columnHelper.accessor('clicks', {
      header: 'Clicks',
      cell: (info) => {
        const { clicks } = info.row.original;
        return <div>{clicks}</div>;
      },
    }),
    columnHelper.accessor('conversion_rate', {
      header: 'Conversion Rate',
      cell: (info) => {
        const { conversion_rate } = info.row.original;
        return <div>{conversion_rate}</div>;
      },
    }),
    columnHelper.accessor('cpa', {
      header: 'CPA',
      cell: (info) => {
        const { cpa } = info.row.original;
        return <div>{cpa}</div>;
      },
    }),
    columnHelper.accessor('revenue', {
      header: 'Revenue',
      cell: (info) => {
        const { revenue } = info.row.original;
        return <div>{revenue}</div>;
      },
    }),
    columnHelper.accessor('profit', {
      header: 'Profit',
      cell: (info) => {
        const { profit } = info.row.original;
        return <div>{profit}</div>;
      },
    }),
  ];
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data: verticals,
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
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });
  console.log(verticals);
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
                              className: clsx({
                                'cursor-pointer select-none flex items-center gap-2':
                                  header.column.getCanSort(),
                              }),
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
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
                            }[header.column.getIsSorted() as string] ?? null}
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
            </table>
          </div>
        </div>

        <Pagination
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
        />
      </div>
    </div>
  );
};

export default Verticals;
