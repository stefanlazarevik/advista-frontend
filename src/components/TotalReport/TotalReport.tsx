import { TableHeader, TotalReportType } from '~/utils/interface';
import { useEffect, useState } from 'react';
import { numberWithCommas } from '~/utils/common';

type Props = {
  data: TotalReportType;
  tableHeader?: TableHeader[];
};
const TotalReport = ({ data, tableHeader }: Props) => {
  const [items, setItems] = useState<string[]>();
  useEffect(() => {
    const data: string[] = [];
    tableHeader?.map((header) => {
      if (header?.key !== 'name') {
        data.push(header?.key);
      }
      return data;
    });
    console.log({ data });
    setItems(data);
  }, [tableHeader]);
  const getReportByKey = (key: string) => {
    // @ts-ignore
    return data[key];
  };
  return (
    <>
      <tfoot className="table_footer sticky bottom-0">
        <tr>
          <td className="">Total</td>
          {items?.map((item, index) => (
            <td className="ml-5 text-left" key={index}>
              {item === 'total_cost' || item === 'revenue' || item === 'profit'
                ? `${numberWithCommas(getReportByKey(item))} USD`
                : item === 'conversion_rate'
                ? `${numberWithCommas(getReportByKey(item))} %`
                : `${numberWithCommas(getReportByKey(item))}`}
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
