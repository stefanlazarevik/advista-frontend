import { getTokenInfo } from '~/lib/auth/authlib';
import axios from 'axios';
import { API_URL } from '~/environments';
import { DailyReportType, Product, TotalReportType } from '~/utils/interface';
import DailyData from '~/components/DailyData';

type Params = {
  selectedTab: number;
  startDate: string;
  endDate: string;
  dailySearchFilter: string;
};
type ResponseType = {
  success: true;
  data: DailyReportType[];
  daily_total_report: TotalReportType;
};
export const getDailyReport = (params: Params) => {
  return {
    queryFn() {
      const token = getTokenInfo()?.access_token;
      let paramsData = {
        start_date: params?.startDate,
        end_date: params?.endDate,
      };
      return axios
        .get<ResponseType>(`${API_URL}/daily-reports/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            ...paramsData,
          },
        })
        .then(({ data }) => data);
    },
    queryKey: [
      'daily-report',
      params?.selectedTab,
      params?.startDate,
      params?.endDate,
    ],
  };
};
