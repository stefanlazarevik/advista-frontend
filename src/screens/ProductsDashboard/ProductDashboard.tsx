import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

import ProductActivity from '~/components/ProductActivity';
import ProductView from '~/components/ProductView';
import { get7Days, getDateFormat } from '~/utils/dateformat.js';
import { getTotalReport } from '~/services/productActivity/totalReports';
import { useQuery } from '@tanstack/react-query';
export type TotalReportType = {
  conversions: number;
  total_cost: number;
  clicks: number;
  impressions: number;
  revenue: number;
  conversion_rate: number;
  cpc: number;
  ctr: number;
  cpm: number;
  cpa: number;
  profit: number;
  roi: number;
};
const ProductsDashboard = () => {
  const [date, setDate] = useState({
    startDate: getDateFormat(get7Days()),
    endDate: getDateFormat(new Date()),
  });
  const [accountsReport, setAccountsReport] = useState<TotalReportType>();
  const [mediaBuyerReport, setMediaBuyerReport] = useState<TotalReportType>();
  const [verticalsReport, setVerticalsReport] = useState<TotalReportType>();
  const { startDate, endDate } = date;
  const { queryKey: TotalKey, queryFn: TotalReportFn } = getTotalReport({
    start_date: startDate,
    end_date: endDate,
  });
  const { data, isLoading } = useQuery(TotalKey, TotalReportFn, {
    onSuccess(data) {
      const { total_repots, media_buyer_reports, vertical_reports } = data;
      setAccountsReport(total_repots);
      setMediaBuyerReport(media_buyer_reports);
      setVerticalsReport(vertical_reports);
    },
    retry: 1,
  });
  const handleValueChange = (newValue: any) => {
    setDate(newValue);
  };

  return (
    <div className="py-10">
      <header>
        <div className="m mx-auto mb-2 flex max-w-7xl flex-wrap justify-center gap-4 px-4 sm:mb-0 sm:flex-nowrap sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
          <div>
            <Datepicker
              value={date}
              onChange={handleValueChange}
              containerClassName="z-20"
            />
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            {accountsReport ? (
              <ProductActivity total_report={accountsReport} />
            ) : null}
            <ProductView
              date={date}
              accountsReport={accountsReport}
              mediaBuyerReport={mediaBuyerReport}
              verticalsReport={verticalsReport}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
export default ProductsDashboard;
