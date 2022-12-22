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
import { HiArrowUp, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { DebouncedInput } from '../DebouncedInput';
import Pagination from '../Pagination';

export const accounts = [
  {
    id: 1,
    advertiser_id: '7133188606872633345',
    name: 'MB1_LATAM_Study',
    timezone: 'Etc/GMT+3',
    display_timezone: 'America/Sao_Paulo',
    status: 'active',
    total_cost: 3405.49,
    clicks: 97105,
    conversion_rate: 48.07,
    conversions: 46676,
    cpm: 0.6,
    cpc: 0.04,
    ctr: 1.71,
    cpa: 0.07,
    impressions: 5680941,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 0,
    profit: -3405.49,
    roi: -100,
    currency: 'EUR',
  },
  {
    id: 2,
    advertiser_id: '7133596697539756033',
    name: 'MB1_BR_Study',
    timezone: 'Etc/GMT+3',
    display_timezone: 'America/Sao_Paulo',
    status: 'active',
    total_cost: 1828.11,
    clicks: 27023,
    conversion_rate: 36.35,
    conversions: 9822,
    cpm: 1.31,
    cpc: 0.07,
    ctr: 1.94,
    cpa: 0.19,
    impressions: 1394490,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 0,
    profit: -1828.11,
    roi: -100,
    currency: 'EUR',
  },
  {
    id: 3,
    advertiser_id: '7133596752032137218',
    name: 'MB1_MX_Study',
    timezone: 'Etc/GMT+6',
    display_timezone: 'America/Mexico_City',
    status: 'active',
    total_cost: 8957.11,
    clicks: 148982,
    conversion_rate: 31.42,
    conversions: 46808,
    cpm: 0.99,
    cpc: 0.06,
    ctr: 1.64,
    cpa: 0.19,
    impressions: 9063061,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 0,
    profit: -8957.11,
    roi: -100,
    currency: 'EUR',
  },
  {
    id: 4,
    advertiser_id: '7146177876864319489',
    name: 'TP - US -  - recYN6dQN2wdtn1HI',
    timezone: 'Etc/GMT-1',
    display_timezone: 'Europe/Amsterdam',
    status: 'active',
    total_cost: 0,
    clicks: 0,
    conversion_rate: 0,
    conversions: 0,
    cpm: 0,
    cpc: 0,
    ctr: 0,
    cpa: 0,
    impressions: 0,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 0,
    profit: 0,
    roi: 0,
    currency: 'EUR',
  },
  {
    id: 5,
    advertiser_id: '7147985740792725505',
    name: 'TP - BE - EP - reciLbLpYfNrO6Kev',
    timezone: 'Etc/GMT-1',
    display_timezone: 'Europe/Amsterdam',
    status: 'active',
    total_cost: 0,
    clicks: 0,
    conversion_rate: 0,
    conversions: 0,
    cpm: 0,
    cpc: 0,
    ctr: 0,
    cpa: 0,
    impressions: 0,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 0,
    profit: 0,
    roi: 0,
    currency: 'EUR',
  },
  {
    id: 6,
    advertiser_id: '7148061235223740417',
    name: 'ES - US - CSD - recsRfppSGSX7oJP4',
    timezone: 'Etc/GMT+5',
    display_timezone: 'America/New_York',
    status: 'limit',
    total_cost: 0,
    clicks: 0,
    conversion_rate: 0,
    conversions: 0,
    cpm: 0,
    cpc: 0,
    ctr: 0,
    cpa: 0,
    impressions: 0,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'limit',
    revenue: 0,
    profit: 0,
    roi: 0,
    currency: 'EUR',
  },
  {
    id: 7,
    advertiser_id: '7148062834197364738',
    name: 'ES - US - DEJ - recl1gJiglvdBwR1C',
    timezone: 'Etc/GMT+5',
    display_timezone: 'America/New_York',
    status: 'active',
    total_cost: 7080.04,
    clicks: 13706,
    conversion_rate: 49.99,
    conversions: 6852,
    cpm: 8.47,
    cpc: 0.52,
    ctr: 1.64,
    cpa: 1.03,
    impressions: 835453,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 7313.21,
    profit: 233.17,
    roi: 3.29,
    currency: 'EUR',
  },
  {
    id: 8,
    advertiser_id: '7148288210228068354',
    name: 'IF - US - TDJ - recKgc06KGnyNHb01',
    timezone: 'Etc/GMT+5',
    display_timezone: 'America/New_York',
    status: 'active',
    total_cost: 0,
    clicks: 0,
    conversion_rate: 0,
    conversions: 0,
    cpm: 0,
    cpc: 0,
    ctr: 0,
    cpa: 0,
    impressions: 0,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 0,
    profit: 0,
    roi: 0,
    currency: 'EUR',
  },
  {
    id: 9,
    advertiser_id: '7148290596724015106',
    name: 'TP - DE - E&G - recdZlKOGbSFMFThb',
    timezone: 'Etc/GMT-1',
    display_timezone: 'Europe/Copenhagen',
    status: 'active',
    total_cost: 0,
    clicks: 0,
    conversion_rate: 0,
    conversions: 0,
    cpm: 0,
    cpc: 0,
    ctr: 0,
    cpa: 0,
    impressions: 0,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 0,
    profit: 0,
    roi: 0,
    currency: 'EUR',
  },
  {
    id: 10,
    advertiser_id: '7148468280649351169',
    name: 'NN - US - CB - recEBmN1C2IfiMLpt',
    timezone: 'Etc/GMT+5',
    display_timezone: 'America/New_York',
    status: 'active',
    total_cost: 8697.07,
    clicks: 22281,
    conversion_rate: 38.38,
    conversions: 8551,
    cpm: 11.82,
    cpc: 0.39,
    ctr: 3.03,
    cpa: 1.02,
    impressions: 735768,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 10025.27,
    profit: 1328.2,
    roi: 15.27,
    currency: 'EUR',
  },
  {
    id: 11,
    advertiser_id: '7148472661088141314',
    name: 'NN - US - CSD - recjMse2bMIP7VT3t',
    timezone: 'Etc/GMT+5',
    display_timezone: 'America/New_York',
    status: 'limit',
    total_cost: 0,
    clicks: 0,
    conversion_rate: 0,
    conversions: 0,
    cpm: 0,
    cpc: 0,
    ctr: 0,
    cpa: 0,
    impressions: 0,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'limit',
    revenue: 0,
    profit: 0,
    roi: 0,
    currency: 'EUR',
  },
  {
    id: 12,
    advertiser_id: '7148473569880571905',
    name: 'NN - US - DI - reczTWTvzijulHdgO',
    timezone: 'Etc/GMT+5',
    display_timezone: 'America/New_York',
    status: 'active',
    total_cost: 0,
    clicks: 0,
    conversion_rate: 0,
    conversions: 0,
    cpm: 0,
    cpc: 0,
    ctr: 0,
    cpa: 0,
    impressions: 0,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 0,
    profit: 0,
    roi: 0,
    currency: 'EUR',
  },
  {
    id: 13,
    advertiser_id: '7148474717010198529',
    name: 'NN - US - DSD - receunjMvurO2U1IL',
    timezone: 'Etc/GMT+5',
    display_timezone: 'America/New_York',
    status: 'active',
    total_cost: 2397.09,
    clicks: 3821,
    conversion_rate: 52.63,
    conversions: 2011,
    cpm: 8.1,
    cpc: 0.63,
    ctr: 1.29,
    cpa: 1.19,
    impressions: 295940,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 2585.03,
    profit: 187.94,
    roi: 7.84,
    currency: 'EUR',
  },
  {
    id: 14,
    advertiser_id: '7148678882370109441',
    name: 'IF - US - DSD - recmiex35pb48x8UW',
    timezone: 'Etc/GMT+5',
    display_timezone: 'America/New_York',
    status: 'active',
    total_cost: 0,
    clicks: 0,
    conversion_rate: 0,
    conversions: 0,
    cpm: 0,
    cpc: 0,
    ctr: 0,
    cpa: 0,
    impressions: 0,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 0,
    profit: 0,
    roi: 0,
    currency: 'EUR',
  },
  {
    id: 15,
    advertiser_id: '7148680060948594689',
    name: 'IF - US - CS - recViW6YxUyBgmeRd',
    timezone: 'Etc/GMT+5',
    display_timezone: 'America/New_York',
    status: 'active',
    total_cost: 5784.37,
    clicks: 10527,
    conversion_rate: 55.04,
    conversions: 5794,
    cpm: 12.08,
    cpc: 0.55,
    ctr: 2.2,
    cpa: 1,
    impressions: 478771,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 6817.98,
    profit: 1033.61,
    roi: 17.87,
    currency: 'EUR',
  },
  {
    id: 16,
    advertiser_id: '7148681997836124162',
    name: 'IF - US - PJ - recuc0rhCokfEmkXn',
    timezone: 'Etc/GMT+5',
    display_timezone: 'America/New_York',
    status: 'active',
    total_cost: 0,
    clicks: 0,
    conversion_rate: 0,
    conversions: 0,
    cpm: 0,
    cpc: 0,
    ctr: 0,
    cpa: 0,
    impressions: 0,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 0,
    profit: 0,
    roi: 0,
    currency: 'EUR',
  },
  {
    id: 17,
    advertiser_id: '7148682916325785601',
    name: 'IF - US - DI - rechbvOun2YZ0rgwU',
    timezone: 'Etc/GMT+5',
    display_timezone: 'America/New_York',
    status: 'active',
    total_cost: 0,
    clicks: 0,
    conversion_rate: 0,
    conversions: 0,
    cpm: 0,
    cpc: 0,
    ctr: 0,
    cpa: 0,
    impressions: 0,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 0,
    profit: 0,
    roi: 0,
    currency: 'EUR',
  },
  {
    id: 18,
    advertiser_id: '7148685142704373762',
    name: 'IF - US - EJ - recHvtR8v0wmw2Xw8',
    timezone: 'Etc/GMT+5',
    display_timezone: 'America/New_York',
    status: 'active',
    total_cost: 2307.05,
    clicks: 2830,
    conversion_rate: 44.35,
    conversions: 1255,
    cpm: 12.95,
    cpc: 0.82,
    ctr: 1.59,
    cpa: 1.84,
    impressions: 178113,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 2136.6,
    profit: -170.45,
    roi: -7.39,
    currency: 'EUR',
  },
  {
    id: 19,
    advertiser_id: '7148686643845693442',
    name: 'IF - US - ND - recUPE890tiUDT5aD',
    timezone: 'Etc/GMT+5',
    display_timezone: 'America/New_York',
    status: 'active',
    total_cost: 0,
    clicks: 0,
    conversion_rate: 0,
    conversions: 0,
    cpm: 0,
    cpc: 0,
    ctr: 0,
    cpa: 0,
    impressions: 0,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 0,
    profit: 0,
    roi: 0,
    currency: 'EUR',
  },
  {
    id: 20,
    advertiser_id: '7148736443647557634',
    name: 'ES - US - PJUS - recOioUL6M0yhvBWV',
    timezone: 'Etc/GMT+5',
    display_timezone: 'America/New_York',
    status: 'active',
    total_cost: 4940.1,
    clicks: 4337,
    conversion_rate: 49.18,
    conversions: 2133,
    cpm: 22.37,
    cpc: 1.14,
    ctr: 1.96,
    cpa: 2.32,
    impressions: 220807,
    company: 'PIXELMIND MEDIA LTD',
    status_code: 'active',
    revenue: 6667.71,
    profit: 1727.61,
    roi: 34.97,
    currency: 'EUR',
  },
];

type Product = {
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

const Accounts = () => {
  const columnHelper = createColumnHelper<Product>();
  const [sorting, setSorting] = React.useState<SortingState>([]);
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
    data: accounts,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter,
    },

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
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
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
                                'w-36',
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
                                <HiArrowUp className="h-5 w-5 transform text-slate-700 transition-all" />
                              ),
                              desc: (
                                <HiArrowUp className="h-5 w-5 rotate-180 transform text-slate-700 transition-all" />
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

export default Accounts;
