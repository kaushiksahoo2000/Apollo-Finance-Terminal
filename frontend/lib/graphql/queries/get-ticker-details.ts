import { gql } from "@apollo/client"

export const GET_TICKER_DETAILS = gql`
  query TICKER_DETAILS($ticker: String!) {
    tickerDetails(ticker: $ticker) {
      description
      homepageUrl
      iconUrl
      listDate
      logoUrl
      marketCap
      name
      shareClassSharesOutstanding
      ticker
      totalEmployees
    }
  }
`
