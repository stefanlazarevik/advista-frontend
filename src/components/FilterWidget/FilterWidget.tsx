import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';
import { BiFilterAlt } from 'react-icons/bi';

import { TableHeader } from '~/utils/interface';

type Props = {
  tableColumn: TableHeader[];
  tableHeader: TableHeader[];
  setTableHeader: React.Dispatch<React.SetStateAction<TableHeader[]>>;
};

const FilterWidget = ({ tableColumn, tableHeader, setTableHeader }: Props) => {
  const [selectedFilters, setSelectedFilters] = useState<TableHeader[]>(() => {
    return tableColumn.filter((header) =>
      tableHeader.some((x) => x?.key === header?.key),
    );
  });
  const sortTableHeader = (data: TableHeader[]) => {
    return data.sort(function (a, b) {
      return a.order - b.order;
    });
  };
  useEffect(() => {
    return setTableHeader(sortTableHeader(selectedFilters));
  }, [selectedFilters, setTableHeader]);
  return (
    <Listbox value={selectedFilters} onChange={setSelectedFilters} multiple>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative flex items-center justify-center gap-2 rounded-md border border-indigo-300 bg-indigo-50 px-4 py-3 text-left  font-medium text-indigo-700 shadow-sm hover:bg-indigo-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm ">
              <BiFilterAlt className="text-indigo-800" size={18} />
              Filter
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-10"
              leaveTo="opacity-25"
            >
              <Listbox.Options className="absolute right-0 z-20 mt-1 max-h-60 w-[200px] overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {tableColumn.map((header) => (
                  <Listbox.Option
                    key={header?.key}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-pointer select-none py-2 pl-4 pr-9',
                      )
                    }
                    value={header}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {header?.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
export default FilterWidget;
