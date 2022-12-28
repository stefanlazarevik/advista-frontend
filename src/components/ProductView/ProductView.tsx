import { Tab } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { BiFilterAlt } from 'react-icons/bi';

import Accounts from '../Accounts';

import FilterWidget from '~/components/FilterWidget';
import MediaBuyer from '~/components/Media Buyer/MediaBuyer';
import { productColumn, productFilterValue } from '~/components/ProductView/type';
import Verticals from '~/components/Verticals/Verticals';
import { getMediaBuyer } from '~/services/productView/mediabuyer';
import { getProducts } from '~/services/productView/products';
import { getVerticals } from '~/services/productView/verticals';

const ProductView = ({
                       date,
                       accountsReport,
                       mediaBuyerReport,
                       verticalsReport,
                     }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [tableColumnForAccounts, setTableColumnForAccounts] = useState(() => {
    return productColumn;
  });
  const [tableHeaderForAccounts, setTableHeaderForAccounts] = useState(() => {
    return productFilterValue;
  });

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
  }

  const tabs = [
    { name: 'Accounts', href: '#', current: true, value: 0 },
    { name: 'Media Buyer', href: '#', current: false, value: 1 },
    { name: 'Verticals', href: '#', current: false, value: 2 },
  ];
  const { startDate, endDate } = date;
  const { queryKey: productKey, queryFn: productFn } = getProducts({
    selectedTab: selectedIndex,
    startDate: startDate,
    endDate: endDate,
  });
  const { data: productData } = useQuery(productKey, productFn, {
    retry: 1,
    keepPreviousData: true,
    enabled: selectedIndex === 0,
  });
  const { queryKey: mediaBuyerKey, queryFn: mediaBuyerFn } = getMediaBuyer({
    selectTab: selectedIndex,
    start_date: startDate,
    end_date: endDate,
  });
  const { queryKey: verticalsKey, queryFn: verticalsFn } = getVerticals({
    selectTab: selectedIndex,
    start_date: startDate,
    end_date: endDate,
  });
  const { data: mediaBuyerData } = useQuery(mediaBuyerKey, mediaBuyerFn, {
    retry: 1,
    keepPreviousData: true,
    enabled: selectedIndex === 1,
  });
  const { data: verticalsData } = useQuery(verticalsKey, verticalsFn, {
    retry: 1,
    keepPreviousData: true,
    enabled: selectedIndex === 2,
  });
  const media_buyer = mediaBuyerData?.results?.data;
  const products = productData?.results?.data;
  const verticals = verticalsData?.results?.data;

  const handledFilter = () => {
    setFilterVisible(true);
  };
  const getTableColumn = () => {
    if (selectedIndex === 0) return tableColumnForAccounts;
  };
  const getTableHeader = () => {
    if (selectedIndex === 0) return tableHeaderForAccounts;
  };
  const setTableHeaderFn = () => {
    if (selectedIndex === 0) return setTableHeaderForAccounts;

  };
  return (
    <div className='px-2 pt-4 sm:px-0'>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className='relative flex items-center justify-between border-b border-gray-200 py-5 sm:py-1'>
          <div className='sm:hidden'>
            <label htmlFor='current-tab' className='sr-only'>
              Select a tab
            </label>
            <select
              onChange={(e) => {
                setSelectedIndex(Number(e.target.value));
              }}
              id='current-tab'
              name='current-tab'
              className='block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              // defaultValue={tabs?.find((tab) => tab.current).name}
            >
              {tabs.map((tab) => (
                <option key={tab.name} value={tab.value}>
                  {tab.name}
                </option>
              ))}
            </select>
          </div>
          <div className='hidden sm:block'>
            <nav className='-mb-px flex space-x-8'>
              <Tab.List className='flex gap-5'>
                {tabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-indigo-500 text-indigo-600 focus:outline-none'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium',
                      )
                    }
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    {tab.name}
                  </Tab>
                ))}
                <div
                  onClick={() => handledFilter()}
                  className='mb-4 rounded-lg border border-gray-400 bg-white px-3 py-2'
                >
                  <BiFilterAlt size={18} />
                </div>
                <FilterWidget
                  visible={filterVisible}
                  setVisible={setFilterVisible}
                  tableColumn={getTableColumn()}
                  tableHeader={getTableHeader()}
                  setTableHeader={setTableHeaderFn()}
                />
              </Tab.List>
            </nav>
          </div>

          <div className='md:flex md:items-center md:justify-between'>
            <button
              type='button'
              className='ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Create
            </button>
          </div>
        </div>

        <Tab.Panels tabIndex={-1}>
          <Tab.Panel>
            {products && tableHeaderForAccounts ? (
              <Accounts
                products={products}
                accountsReport={accountsReport}
                tableHeader={tableHeaderForAccounts}
              />
            ) : null}
          </Tab.Panel>
          <Tab.Panel tabIndex={-1}>
            {media_buyer ? (
              <MediaBuyer
                media_buyer={media_buyer}
                mediaBuyerReport={mediaBuyerReport}
              />
            ) : null}
          </Tab.Panel>
          <Tab.Panel tabIndex={-1}>
            {verticals != null ? (
              <Verticals
                verticals={verticals}
                verticalsReport={verticalsReport}
              />
            ) : null}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default ProductView;
