import { numberWithCommas } from '~/utils/common';

const includeKeys = [
  'total_cost',
  'clicks',
  'conversion_rate',
  'cpa',
  'revenue',
  'profit',
];

const TotalReport = ({ data }: any) => {
  console.log('data', data);
  return (
    <>
      <tfoot className="table_footer sticky bottom-0 h-12 bg-slate-200">
        <tr>
          <th
            // scope="row"
            className=""
          >
            Total
          </th>
          {includeKeys.map((item, index) => (
            <th className="ml-5 text-left" key={index}>
              {item === 'total_cost' || item === 'revenue' || item === 'profit'
                ? `${data[item]} USD`
                : item === 'conversion_rate'
                ? `${data[item]} %`
                : data[item]}
            </th>
          ))}
          {/*{Object.keys(data).map((key) => (*/}
          {/*  <th key={key}>{data[key]}</th>*/}
          {/*))}*/}
        </tr>
      </tfoot>
    </>
  );
};
export default TotalReport;
