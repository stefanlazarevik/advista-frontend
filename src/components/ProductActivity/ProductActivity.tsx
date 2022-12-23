import { useQuery } from '@tanstack/react-query';

import { getTotalReport } from '~/services/productActivity/totalReports';

const stats = [
  { name: 'Profit', stat: '0.0k USD', key: 'profit' },
  { name: 'Revenue', stat: '0.0k USD', key: 'revenue' },
  { name: 'Total Cost', stat: '0.0k USD', key: 'total_cost' },
];

type Props = {
  date: {
    startDate: string;
    endDate: string;
  };
};

const ProductActivity = ({ date }: Props) => {
  const { startDate, endDate } = date;
  const { queryKey: TotalKey, queryFn: ToltaFn } = getTotalReport({
    start_date: startDate,
    end_date: endDate,
  });
  const { data } = useQuery(TotalKey, ToltaFn, {
    onSuccess(data) {
      const { total_repots } = data;
      stats.forEach((items) => {
        items.stat = `${Number(Number(total_repots[items?.key]) / 1000).toFixed(
          1,
        )}  k USD`;
      });
      console.log({ stats });
    },
    retry: 1,
    keepPreviousData: true,
  });

  return (
    <dl className="flex justify-between gap-5 overflow-x-auto py-2">
      {stats.map((item) => (
        <div
          key={item.name}
          className=" flex-shrink-0 grow rounded-lg bg-white px-4 py-4 shadow sm:p-6"
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
  );
};
export default ProductActivity;
