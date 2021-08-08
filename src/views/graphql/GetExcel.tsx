import { useQuery, gql } from '@apollo/client';

export const GET_EXCEL_QUERY = gql`
  query GetExcel {
    GetExcel {
      excel_link
    }
  }
`;

const GetExcel = () => {
  return useQuery(GET_EXCEL_QUERY);
};

export default GetExcel;
