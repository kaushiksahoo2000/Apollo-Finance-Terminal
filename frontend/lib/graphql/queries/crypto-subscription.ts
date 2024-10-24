import { gql } from "@apollo/client"

export const CRYPTO_SUBSCRIPTION = gql`
  subscription Subscription {
    coinbaseBTCUpdate {
      timestamp
      sequence_num
      events {
        type
        tickers {
          product_id
          price
          low_24_h
          high_24_h
          price_percent_chg_24_h
        }
      }
    }
  }
`
