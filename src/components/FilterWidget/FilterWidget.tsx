import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef, useState } from 'react';
import { TableHeader } from '~/utils/interface';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  tableColumn: TableHeader[];
  tableHeader: TableHeader[];
  setTableHeader: React.Dispatch<React.SetStateAction<TableHeader[]>>;
};

const FilterWidget = ({
  visible,
  setVisible,
  tableColumn,
  tableHeader,
  setTableHeader,
}: Props) => {
  const [selectedFilters, setSelectedFilters] =
    useState<TableHeader[]>(tableHeader);
  const cancelButtonRef = useRef(null);
  const handleChange = (filter: TableHeader) => {
    if (selectedFilters.find((val) => val?.key === filter?.key)) {
      setSelectedFilters(selectedFilters.filter((x) => x.key !== filter.key));
    } else {
      setSelectedFilters((val: any) => [...val, filter]);
    }
  };
  const foundValue = (header: TableHeader) => {
    const found = selectedFilters.find((value) => value?.key === header?.key);
    return !!found;
  };

  const applyFilter = () => {
    const sortedData = sortTableHeader(selectedFilters);
    setTableHeader(sortedData);
    setVisible(false);
  };
  const sortTableHeader = (data: TableHeader[]) => {
    return data.sort(function (a, b) {
      return a.order - b.order;
    });
  };
  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setVisible}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-30"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          vca
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 px-6 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-lg font-medium leading-6 text-gray-900"
                      >
                        <span>X</span>
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          <fieldset>
                            <div className="mt-4">
                              {tableColumn?.map((header, index) => (
                                <div
                                  key={index}
                                  className="relative flex items-start py-4"
                                >
                                  <div className="min-w-0 flex-1 text-sm">
                                    <label
                                      htmlFor={`table-${header?.key}`}
                                      className="font-base select-none text-lg text-gray-700"
                                    >
                                      {header?.label}
                                    </label>
                                  </div>
                                  <div className="ml-20 flex h-5 items-center">
                                    <input
                                      onChange={(x) => handleChange(header)}
                                      id={`table-${header.key}`}
                                      checked={foundValue(header)}
                                      type="checkbox"
                                      className="h-6 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </fieldset>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => applyFilter()}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setVisible(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default FilterWidget;
