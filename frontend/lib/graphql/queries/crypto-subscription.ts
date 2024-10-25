import { gql } from "@apollo/client"

export const CRYPTO_SUBSCRIPTION = gql`
  subscription CRYPTO_SUBSCRIPTION {
    coinbaseUpdate {
      events {
        type
        tickers {
          product_id
          price
          high_24_h
          low_24_h
          price_percent_chg_24_h
        }
      }
      sequence_num
      timestamp
    }
  }
`
