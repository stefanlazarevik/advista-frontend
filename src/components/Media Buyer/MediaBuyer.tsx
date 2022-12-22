import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
export const media_buyer = [
  {
    id: 1,
    name: "Imee Francisco",
    email: "imee@advista.io",
    media_buyer_id: "usr9ICb5rmMOztPLe",
    conversion_rate: 39.88,
    total_cost: 10008.09,
    clicks: 40498,
    conversions: 16151,
    impressions: 1682910,
    ctr: 2.41,
    cpm: 5.95,
    cpc: 0.25,
    cpa: 0.62,
    revenue: 10135.62,
    profit: 127.53,
    roi: 1.27,
  },
  {
    id: 2,
    name: "Zyra",
    email: "zyra@advista.io",
    media_buyer_id: "usr7gwWAcdPepzqnn",
    conversion_rate: 34.64,
    total_cost: 18541.09,
    clicks: 30097,
    conversions: 10426,
    impressions: 2331057,
    ctr: 1.29,
    cpm: 7.95,
    cpc: 0.62,
    cpa: 1.78,
    revenue: 22660.43,
    profit: 4119.34,
    roi: 22.22,
  },
  {
    id: 3,
    name: "Ayran Sumile",
    email: "ayran@advista.io",
    media_buyer_id: "usr4nMe7T9MWX777G",
    conversion_rate: 42.31,
    total_cost: 6463.6,
    clicks: 9141,
    conversions: 3868,
    impressions: 522677,
    ctr: 1.75,
    cpm: 12.37,
    cpc: 0.71,
    cpa: 1.67,
    revenue: 6470.46,
    profit: 6.86,
    roi: 0.11,
  },
  {
    id: 4,
    name: "Nifil Najera",
    email: "nifil@advista.io",
    media_buyer_id: "usr5qG7TdIwqZJtzZ",
    conversion_rate: 42.55,
    total_cost: 15871.86,
    clicks: 32265,
    conversions: 13728,
    impressions: 1391138,
    ctr: 2.32,
    cpm: 11.41,
    cpc: 0.49,
    cpa: 1.16,
    revenue: 17658.37,
    profit: 1786.51,
    roi: 11.26,
  },
  {
    id: 5,
    name: "Elmo Sese",
    email: "elmo@advista.io",
    media_buyer_id: "usrKd9RrIuVV6eNCK",
    conversion_rate: 47.05,
    total_cost: 18562.8,
    clicks: 28532,
    conversions: 13425,
    impressions: 1673015,
    ctr: 1.71,
    cpm: 11.1,
    cpc: 0.65,
    cpa: 1.38,
    revenue: 20711.76,
    profit: 2148.96,
    roi: 11.58,
  },
  {
    id: 6,
    name: "Frank Picardal",
    email: "frank@advista.io",
    media_buyer_id: "usrMJARo3kio2edlY",
    conversion_rate: 42.43,
    total_cost: 23605.25,
    clicks: 26686,
    conversions: 11323,
    impressions: 2090262,
    ctr: 1.28,
    cpm: 11.29,
    cpc: 0.88,
    cpa: 2.08,
    revenue: 32563.23,
    profit: 8957.98,
    roi: 37.95,
  },
  {
    id: 7,
    name: "Mafar Kannapha",
    email: "kannapha@advista.io",
    media_buyer_id: "usrw0W2XpacMHf0Kl",
    conversion_rate: 0,
    total_cost: 0,
    clicks: 0,
    conversions: 0,
    impressions: 0,
    ctr: 0,
    cpm: 0,
    cpc: 0,
    cpa: 0,
    revenue: 5.13,
    profit: 5.13,
    roi: 0,
  },
  {
    id: 8,
    name: "Tanguy P",
    email: "tanguy@advista.io",
    media_buyer_id: "usrAMZ69DpANPKED3",
    conversion_rate: 0,
    total_cost: 0,
    clicks: 0,
    conversions: 0,
    impressions: 0,
    ctr: 0,
    cpm: 0,
    cpc: 0,
    cpa: 0,
    revenue: 0,
    profit: 0,
    roi: 0,
  },
  {
    id: 10,
    name: "Pedro Bender",
    email: "pedro@advista.io",
    media_buyer_id: "usrfd7jyk2gF7qCHS",
    conversion_rate: 29.63,
    total_cost: 3071.33,
    clicks: 87827,
    conversions: 26019,
    impressions: 3403167,
    ctr: 2.58,
    cpm: 0.9,
    cpc: 0.03,
    cpa: 0.12,
    revenue: 2063.85,
    profit: -1007.48,
    roi: -32.8,
  },
  {
    id: 11,
    name: "Nifil Najera",
    email: "nifil@advista.io",
    media_buyer_id: "usr5qG7TdIwqZJtzZ",
    conversion_rate: 42.55,
    total_cost: 15871.86,
    clicks: 32265,
    conversions: 13728,
    impressions: 1391138,
    ctr: 2.32,
    cpm: 11.41,
    cpc: 0.49,
    cpa: 1.16,
    revenue: 17658.37,
    profit: 1786.51,
    roi: 11.26,
  },
  {
    id: 12,
    name: "Elmo Sese",
    email: "elmo@advista.io",
    media_buyer_id: "usrKd9RrIuVV6eNCK",
    conversion_rate: 47.05,
    total_cost: 18562.8,
    clicks: 28532,
    conversions: 13425,
    impressions: 1673015,
    ctr: 1.71,
    cpm: 11.1,
    cpc: 0.65,
    cpa: 1.38,
    revenue: 20711.76,
    profit: 2148.96,
    roi: 11.58,
  },
  {
    id: 13,
    name: "Frank Picardal",
    email: "frank@advista.io",
    media_buyer_id: "usrMJARo3kio2edlY",
    conversion_rate: 42.43,
    total_cost: 23605.25,
    clicks: 26686,
    conversions: 11323,
    impressions: 2090262,
    ctr: 1.28,
    cpm: 11.29,
    cpc: 0.88,
    cpa: 2.08,
    revenue: 32563.23,
    profit: 8957.98,
    roi: 37.95,
  },
  {
    id: 14,
    name: "Mafar Kannapha",
    email: "kannapha@advista.io",
    media_buyer_id: "usrw0W2XpacMHf0Kl",
    conversion_rate: 0,
    total_cost: 0,
    clicks: 0,
    conversions: 0,
    impressions: 0,
    ctr: 0,
    cpm: 0,
    cpc: 0,
    cpa: 0,
    revenue: 5.13,
    profit: 5.13,
    roi: 0,
  },
  {
    id: 15,
    name: "Tanguy P",
    email: "tanguy@advista.io",
    media_buyer_id: "usrAMZ69DpANPKED3",
    conversion_rate: 0,
    total_cost: 0,
    clicks: 0,
    conversions: 0,
    impressions: 0,
    ctr: 0,
    cpm: 0,
    cpc: 0,
    cpa: 0,
    revenue: 0,
    profit: 0,
    roi: 0,
  },
  {
    id: 16,
    name: "Pedro Bender",
    email: "pedro@advista.io",
    media_buyer_id: "usrfd7jyk2gF7qCHS",
    conversion_rate: 29.63,
    total_cost: 3071.33,
    clicks: 87827,
    conversions: 26019,
    impressions: 3403167,
    ctr: 2.58,
    cpm: 0.9,
    cpc: 0.03,
    cpa: 0.12,
    revenue: 2063.85,
    profit: -1007.48,
    roi: -32.8,
  },
];

type MediaBuyerType = {
  id: number;
  name: string;
  email: string;
  media_buyer_id: string;
  total_cost: number;
  clicks: number;
  conversion_rate: number;
  conversions: number;
  cpm: number;
  cpc: number;
  ctr: number;
  cpa: number;
  impressions: number;
  revenue: number;
  profit: number;
  roi: number;
};

const MediaBuyer = () => {
  const columnHelper = createColumnHelper<MediaBuyerType>();
  const columns = [
    columnHelper.display({
      id: "name",
      header: "Name",
      cell: (info) => {
        const { name } = info.row.original;
        return <div>{name}</div>;
      },
    }),
    columnHelper.display({
      id: "total_cost",
      header: "Total Cost",
      cell: (info) => {
        const { total_cost } = info.row.original;
        return <div>{total_cost}</div>;
      },
    }),
    columnHelper.display({
      id: "clicks",
      header: "Clicks",
      cell: (info) => {
        const { clicks } = info.row.original;
        return <div>{clicks}</div>;
      },
    }),
    columnHelper.display({
      id: "conversion_rate",
      header: "Conversion Rate",
      cell: (info) => {
        const { conversion_rate } = info.row.original;
        return <div>{conversion_rate}</div>;
      },
    }),
    columnHelper.display({
      id: "cpa",
      header: "CPA",
      cell: (info) => {
        const { cpa } = info.row.original;
        return <div>{cpa}</div>;
      },
    }),
    columnHelper.display({
      id: "revenue",
      header: "Revenue",
      cell: (info) => {
        const { revenue } = info.row.original;
        return <div>{revenue}</div>;
      },
    }),
    columnHelper.display({
      id: "profit",
      header: "Profit",
      cell: (info) => {
        const { profit } = info.row.original;
        return <div>{profit}</div>;
      },
    }),
  ];

  const table = useReactTable({
    data: media_buyer,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 px-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="table_container">
              <thead className="table_head">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
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
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaBuyer;
