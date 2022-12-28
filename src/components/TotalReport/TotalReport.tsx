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
  return (
    <>
      <tfoot className="table_footer sticky bottom-0">
        <tr>
          <td
            // scope="row"
            className=""
          >
            Total
          </td>
          {includeKeys.map((item, index) => (
            <td className="ml-5 text-left" key={index}>
              {item === 'total_cost' || item === 'revenue' || item === 'profit'
                ? `${data[item]} USD`
                : item === 'conversion_rate'
                ? `${data[item]} %`
                : data[item]}
            </td>
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
