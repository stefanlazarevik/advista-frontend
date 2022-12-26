const ProductActivity = ({ total_report }: any) => {
  return (
    <dl className="flex justify-between gap-5 overflow-x-auto py-2">
      {['profit', 'revenue', 'total_cost'].map((item: string, index) => (
        <div
          key={index}
          className=" flex-shrink-0 grow rounded-lg bg-white px-4 py-4 shadow sm:p-6"
        >
          <dt className="truncate text-sm font-medium capitalize text-gray-500">
            {item.replaceAll('_', ' ')}
          </dt>
          <dd className="mt-1 bg-gradient-to-r from-purple-700 to-pink-800 bg-clip-text text-3xl font-semibold uppercase tracking-tight text-transparent">
            {`${Number(Number(total_report[item]) / 1000).toFixed(1)}k USD`}
          </dd>
        </div>
      ))}
    </dl>
  );
};
export default ProductActivity;
