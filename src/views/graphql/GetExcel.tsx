import { useQuery, gql } from '@apollo/client';

const GetExcel = () => {
  const getExcelQuery = gql`
    query GetExcel {
      GetExcel {
        excel_link
      }
    }
  `;

  return useQuery(getExcelQuery);
};

export default GetExcel;
