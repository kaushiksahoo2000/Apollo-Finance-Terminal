import { gql } from "@apollo/client"

export const GENERATE_AI_RESPONSE = gql`
  mutation GENERATE_AI_RESPONSE($tickerPrompt: String!) {
    genAIFinancialsContent(tickerPrompt: $tickerPrompt) {
      candidates {
        content {
          parts {
            text
          }
          role
        }
        finishReason
        index
        safetyRatings {
          category
          probability
        }
        citationMetadata {
          citationSources {
            startIndex
            endIndex
            uri
            license
          }
        }
      }
      usageMetadata {
        promptTokenCount
        candidatesTokenCount
        totalTokenCount
      }
      modelVersion
    }
  }
`
