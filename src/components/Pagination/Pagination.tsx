import * as React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import ReactPaginate from 'react-paginate';

export interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  from: number;
  to: number;
  disableInitialCallback?: boolean;
  initialPage?: number;
  onPageChange: (t: number) => any;
}

const containerClass = 'isolate inline-flex -space-x-px rounded-md shadow-sm';
const activeClass =
  'relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20';
const inActiveClass =
  'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20';
const leftLinkClassName = `relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`;
const rightLinkClassName = `relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`;

const getPageNumbers = (totalItems: number, itemsPerPage: number): number =>
  Math.ceil(totalItems / itemsPerPage) >> 0;

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  from,
  to,
  disableInitialCallback = false,
  initialPage = 0,
}: PaginationProps) => {
  const handleOnPageChange = React.useCallback(
    ({ selected = 0 }) => onPageChange(selected),
    [onPageChange],
  );
  const pageCount = React.useMemo(
    () => getPageNumbers(totalItems, itemsPerPage),
    [totalItems, itemsPerPage],
  );
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4 border-t  border-gray-200 px-4 py-3 sm:flex-nowrap">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium"> {from}</span> to{' '}
          <span className="font-medium"> {to}</span> of{' '}
          <span className="font-medium">{totalItems}</span> results
        </p>
      </div>
      <ReactPaginate
        containerClassName={containerClass}
        previousLabel={<HiChevronLeft className="h-5 w-5" />}
        previousLinkClassName={leftLinkClassName}
        nextLabel={<HiChevronRight className="h-5 w-5" />}
        nextLinkClassName={rightLinkClassName}
        breakLinkClassName={inActiveClass}
        activeLinkClassName={activeClass}
        pageLinkClassName={inActiveClass}
        onPageChange={handleOnPageChange}
        pageRangeDisplayed={2}
        marginPagesDisplayed={3}
        disableInitialCallback={disableInitialCallback}
        pageCount={pageCount}
        renderOnZeroPageCount={() => null}
        forcePage={currentPage}
      />
    </div>
  );
};

export default Pagination;
