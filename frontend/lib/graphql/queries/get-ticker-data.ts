import { gql } from "@apollo/client"

export const GET_TICKER_DATA = gql`
  query STONKS(
    $ticker: String!
    $from: String!
    $to: String!
    $timespan: String!
  ) {
    aggregateBars(ticker: $ticker, from: $from, to: $to, timespan: $timespan) {
      ticker
      results {
        closePrice
        highestPrice
        lowestPrice
        openPrice
        timestamp
      }
    }
  }
`
