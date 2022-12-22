import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
export const verticals = [
  {
    id: 1270,
    details: {
      url: ["https://08284c.zksjljmxsjzzkrm.com"],
      name: "Audiobooks",
      stats: ["Approved"],
      source: ["TONIC"],
      domains: ["reccobdfUZeumGxMe"],
      category: "Entertainment",
    },
    vertical_id: "rec0KaxWprA2UbETp",
    created_time: "2022-07-09T22:19:06",
    conversion_rate: 0,
    total_cost: 0,
    clicks: 0,
    conversions: 0,
    impressions: 0,
    name: "Audiobooks",
    ctr: 0,
    cpm: 0,
    cpc: 0,
    cpa: 0,
    revenue: 0,
    profit: 0,
    roi: 0,
  },
  {
    id: 1280,
    details: {
      url: [
        "https://55fdb9.zksjljmxsjzzkrm.com",
        "https://915e67.zksjljmxsjzzkrm.com",
        "https://075e41.zksjljmxsjzzkrm.com",
      ],
      name: "Furniture",
      stats: ["Approved", "Approved", "Approved"],
      source: ["TONIC", "TONIC", "TONIC"],
      domains: ["rec2EoUuRRA5NMCKd", "recCttTV8KxelRYvS", "recYTVNttcXgmrHOE"],
      category: "Furniture",
    },
    vertical_id: "rec0iLMo6qiUKGvgG",
    created_time: "2022-07-09T22:20:07",
    conversion_rate: 63.3,
    total_cost: 86.52,
    clicks: 218,
    conversions: 138,
    impressions: 5781,
    name: "Furniture",
    ctr: 3.77,
    cpm: 14.97,
    cpc: 0.4,
    cpa: 0.63,
    revenue: 75.71,
    profit: -10.81,
    roi: -12.49,
  },
  {
    id: 1317,
    details: {
      url: [
        "https://7c1bd7.zksjljmxsjzzkrm.com",
        "https://7cf512.zksjljmxsjzzkrm.com",
      ],
      name: "Business Email",
      stats: ["Approved", "Approved"],
      source: ["TONIC", "TONIC"],
      domains: ["rec8NSIioIWzWb8Gd", "receCobavR5p6JxK9"],
      category: "Business",
    },
    vertical_id: "rec2IBuXdKaI7e74c",
    created_time: "2022-07-09T22:16:16",
    conversion_rate: 0,
    total_cost: 0,
    clicks: 0,
    conversions: 0,
    impressions: 0,
    name: "Business Email",
    ctr: 0,
    cpm: 0,
    cpc: 0,
    cpa: 0,
    revenue: 0,
    profit: 0,
    roi: 0,
  },
  {
    id: 1328,
    details: {
      url: [
        "a-prime-us-cyber-security.fyi",
        "https://32b972.zksjljmxsjzzkrm.com",
        "https://db5921.zksjljmxsjzzkrm.com",
        "https://5385bd.zksjljmxsjzzkrm.com",
      ],
      name: "Cyber Security",
      stats: ["Approved", "Approved", "Approved"],
      source: ["System1", "TONIC", "TONIC", "TONIC"],
      domains: [
        "rech4Jy1W7URz5N1o",
        "recHsuUc3pgI2f2v4",
        "recCSFwbEYwyjXMQa",
        "recz6okPGrAEvkeC8",
      ],
      category: "Computers",
    },
    vertical_id: "rec2lSy9gbEXBY6rf",
    created_time: "2022-07-09T22:17:51",
    conversion_rate: 54.88,
    total_cost: 6848.04,
    clicks: 12111,
    conversions: 6647,
    impressions: 570745,
    name: "Cyber Security",
    ctr: 2.12,
    cpm: 12,
    cpc: 0.57,
    cpa: 1.03,
    revenue: 8228.31,
    profit: 1380.27,
    roi: 20.16,
  },
  {
    id: 1333,
    details: {
      url: [
        "https://686ac3.zksjljmxsjzzkrm.com",
        "https://7e8884.zksjljmxsjzzkrm.com",
        "https://d65462.zksjljmxsjzzkrm.com",
        "https://097659.zksjljmxsjzzkrm.com",
      ],
      name: "Couches & Sofas",
      stats: ["Approved", "Approved", "Approved", "Approved"],
      source: ["TONIC", "TONIC", "TONIC", "TONIC"],
      domains: [
        "recWE15yzCnuephjf",
        "recOhD2AwBvkYrB1X",
        "recLLvxHqfV3AVtCV",
        "recPuUS9hLaq6tXTm",
      ],
      category: "Home",
    },
    vertical_id: "rec31CWbAdwYDV1dG",
    created_time: "2022-07-09T22:16:37",
    conversion_rate: 0,
    total_cost: 0,
    clicks: 0,
    conversions: 0,
    impressions: 0,
    name: "Couches & Sofas",
    ctr: 0,
    cpm: 0,
    cpc: 0,
    cpa: 0,
    revenue: 0,
    profit: 0,
    roi: 0,
  },
  {
    id: 1369,
    details: {
      url: [
        "https://0f691e.zksjljmxsjzzkrm.com/",
        "https://a5fe0a.zksjljmxsjzzkrm.com/",
        "https://prestamos-hipotecarios-espana.site/",
      ],
      name: "Home Loans",
      stats: ["Approved", "Approved", "Approved"],
      source: ["TONIC", "TONIC", "System1"],
      domains: ["reck3BFhNVWegN8NR", "recZZ7KFNgJQeVnBc", "recYSdbLLrrJufenA"],
      category: "Finance",
    },
    vertical_id: "rec4iY3LgOWl6aeHS",
    created_time: "2022-07-09T22:15:56",
    conversion_rate: 0,
    total_cost: 0,
    clicks: 0,
    conversions: 0,
    impressions: 0,
    name: "Home Loans",
    ctr: 0,
    cpm: 0,
    cpc: 0,
    cpa: 0,
    revenue: 0,
    profit: 0,
    roi: 0,
  },
  {
    id: 1412,
    details: {
      url: ["https://da5805.zksjljmxsjzzkrm.com"],
      name: "Criminal Justice Degree",
      stats: ["Approved"],
      source: ["TONIC"],
      domains: ["recdSTIxDCv3YLkwc"],
      category: "Education",
    },
    vertical_id: "rec6qEVouj8iYRUTY",
    created_time: "2022-07-09T22:16:54",
    conversion_rate: 0,
    total_cost: 0,
    clicks: 0,
    conversions: 0,
    impressions: 0,
    name: "Criminal Justice Degree",
    ctr: 0,
    cpm: 0,
    cpc: 0,
    cpa: 0,
    revenue: 0,
    profit: 0,
    roi: 0,
  },
  {
    id: 1416,
    details: {
      url: ["https://8d6076.zksjljmxsjzzkrm.com"],
      name: "Flower Delivery",
      stats: ["Approved"],
      source: ["TONIC"],
      domains: ["recTH4Fsyz3CiiIGk"],
      category: "Flowers",
    },
    vertical_id: "rec6zuqv69pcMcCXv",
    created_time: "2022-07-09T22:20:56",
    conversion_rate: 0,
    total_cost: 0,
    clicks: 0,
    conversions: 0,
    impressions: 0,
    name: "Flower Delivery",
    ctr: 0,
    cpm: 0,
    cpc: 0,
    cpa: 0,
    revenue: 0,
    profit: 0,
    roi: 0,
  },
  {
    id: 1419,
    details: {
      url: ["https://48c819.zksjljmxsjzzkrm.com"],
      name: "Software Development Jobs",
      stats: ["Approved"],
      source: ["TONIC"],
      domains: ["recDJGpY5XA5pFQEy"],
      category: "Business",
    },
    vertical_id: "rec7B1Ge6to1R5iew",
    created_time: "2022-07-09T22:16:16",
    conversion_rate: 29.41,
    total_cost: 24.48,
    clicks: 51,
    conversions: 15,
    impressions: 2032,
    name: "Software Development Jobs",
    ctr: 2.51,
    cpm: 12.05,
    cpc: 0.48,
    cpa: 1.63,
    revenue: 18.17,
    profit: -6.31,
    roi: -25.78,
  },
  {
    id: 1461,
    details: {
      url: [
        "https://68308c.zksjljmxsjzzkrm.com",
        "https://13e335.zksjljmxsjzzkrm.com",
      ],
      name: "Cellphones",
      stats: ["Approved", "Approved"],
      source: ["TONIC", "TONIC"],
      domains: ["rec13G1LdOTCYCu7p", "recnUpVXE23D34rGQ"],
      category: "Communication",
    },
    vertical_id: "recA8w9NccfjjwROS",
    created_time: "2022-07-09T22:14:57",
    conversion_rate: 36.36,
    total_cost: 26.4,
    clicks: 22,
    conversions: 8,
    impressions: 1345,
    name: "Cellphones",
    ctr: 1.64,
    cpm: 19.63,
    cpc: 1.2,
    cpa: 3.3,
    revenue: 4.71,
    profit: -21.69,
    roi: -82.16,
  },
];

type VerticalsType = {
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

const Verticals = () => {
  const columnHelper = createColumnHelper<VerticalsType>();
  const columns = [
    columnHelper.display({
      id: "name",
      header: "Name",
      cell: (info) => {
        const { details } = info.row.original;
        return <div>{details?.name}</div>;
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
    data: verticals,
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

export default Verticals;
