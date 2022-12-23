import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

import ProductActivity from '~/components/ProductActivity';
import ProductView from '~/components/ProductView';
import { get7Days, getDateFormat } from '~/utils/dateformat.js';

const ProductsDashboard = () => {
  const [date, setDate] = useState({
    startDate: getDateFormat(get7Days()),
    endDate: getDateFormat(new Date()),
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
            <ProductActivity date={date} />
            <ProductView date={date} />
          </div>
        </div>
      </main>
    </div>
  );
};
export default ProductsDashboard;
