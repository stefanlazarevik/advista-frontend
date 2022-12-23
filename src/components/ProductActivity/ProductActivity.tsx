import { useQuery } from '@tanstack/react-query';

import { getTotalReport } from '~/services/productActivity/totalReports';

const stats = [
  { name: 'Profit', stat: '0.0k USD', key: 'profit' },
  { name: 'Revenue', stat: '0.0k USD', key: 'revenue' },
  { name: 'Total Cost', stat: '0.0k USD', key: 'total_cost' },
];

const ProductActivity = ({ date }: any) => {
  const { startDate, endDate } = date;
  const { queryKey: TotalKey, queryFn: ToltaFn } = getTotalReport({
    start_date: startDate,
    end_date: endDate,
  });
  const { data } = useQuery(TotalKey, ToltaFn, {
    onSuccess(data) {
      const { total_repots } = data;
      stats.map((items) => {
        items.stat = total_repots[items?.key] + 'k USD';
      });
      console.log({ stats });
    },
    retry: 1,
    keepPreviousData: true,
  });

  return (
    <div>
      {/*<h3 className="text-lg font-medium leading-6 text-gray-900">*/}
      {/*  Last 30 days*/}
      {/*</h3>*/}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 bg-gradient-to-r from-purple-700 to-pink-800 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
export default ProductActivity;
