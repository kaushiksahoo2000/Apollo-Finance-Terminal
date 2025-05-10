export const AI_RESPONSE_MOCK = {
  candidates: [
    {
      content: {
        parts: [
          {
            text: "## Apple Inc. (AAPL) Financials: A Glimpse\n\nApple Inc. is a financial powerhouse. Here's a breakdown of key financial aspects:\n\n**Strengths:**\n\n* **Dominant Revenue:** Apple consistently generates massive revenue, consistently reaching over $300 billion annually.\n* **Strong Profitability:** Apple boasts exceptional profit margins, reflecting efficient operations and premium pricing.\n* **Cash Flow Machine:**  Apple generates significant free cash flow, enabling significant stock buybacks, dividends, and investments.\n* **Brand Power & Ecosystem:** Apple enjoys an immensely powerful brand, attracting loyal customers within a locked-in ecosystem.\n\n**Key Financial Metrics (as of Q4 2022):**\n\n* **Revenue:** $386 billion\n* **Net Income:** $99.8 billion\n* **Earnings Per Share:** $5.77\n* **Gross Profit Margin:** 43.3%\n* **Operating Profit Margin:** 27.8%\n* **Net Profit Margin:** 25.8%\n* **Free Cash Flow:** $115.4 billion\n* **Debt to Equity Ratio:** 0.47\n* **Current Ratio:** 1.27\n\n**Key Factors Driving Apple's Financials:**\n\n* **iPhone Sales:** The iPhone remains Apple's flagship product, generating a substantial portion of revenue.\n* **Services Growth:** Apple's services segment, encompassing subscriptions like Apple Music, iCloud, and Apple Pay, is experiencing robust growth.\n* **Wearables & Home Products:**  Apple Watch, AirPods, and HomePod are gaining popularity and contributing to the overall growth.\n* **Mac & iPad Sales:**  Though facing competition, Mac and iPad sales continue to perform well.\n\n**Challenges:**\n\n* **Supply Chain Constraints:**  Apple, like many tech companies, has faced supply chain issues due to global factors.\n* **Competition:**  Apple faces fierce competition from Samsung, Google, and other players in various segments.\n* **Economic Uncertainty:**  Global economic uncertainty and inflation may impact consumer spending on discretionary products.\n\n**Investment Perspective:**\n\nApple remains a strong company with a solid financial foundation. Its growth in services, wearables, and other areas suggests potential for continued expansion. However, investors need to consider potential challenges like competition, supply chain issues, and macroeconomic factors.\n\n**Disclaimer:** This information is for general knowledge and informational purposes only and does not constitute financial advice. Before making any investment decisions, it is crucial to consult with a qualified financial professional and conduct thorough research.",
          },
        ],
        role: "model",
      },
      finishReason: "STOP",
      index: 0,
      safetyRatings: [
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          probability: "NEGLIGIBLE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          probability: "NEGLIGIBLE",
        },
        {
          category: "HARM_CATEGORY_HARASSMENT",
          probability: "NEGLIGIBLE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          probability: "NEGLIGIBLE",
        },
      ],
      citationMetadata: {
        citationSources: [
          {
            startIndex: 2270,
            endIndex: 2392,
            uri: "https://devyantra.com/dividend-stock-how-to-choose-the-right-one-for-beginners/",
            license: "",
          },
        ],
      },
    },
  ],
  usageMetadata: {
    promptTokenCount: 8,
    candidatesTokenCount: 538,
    totalTokenCount: 546,
  },
  modelVersion: "gemini-1.5-flash-001",
}

export const GET_TICKER_DETAILS_MOCK = {
  data: {
    tickerDetails: {
      description:
        "Apple is among the largest companies in the world, with a broad portfolio of hardware and software products targeted at consumers and businesses. Apple's iPhone makes up a majority of the firm sales, and Apple's other products like Mac, iPad, and Watch are designed around the iPhone as the focal point of an expansive software ecosystem. Apple has progressively worked to add new applications, like streaming video, subscription bundles, and augmented reality. The firm designs its own software and semiconductors while working with subcontractors like Foxconn and TSMC to build its products and chips. Slightly less than half of Apple's sales come directly through its flagship stores, with a majority of sales coming indirectly through partnerships and distribution.",
      homepageUrl: "https://www.apple.com",
      iconUrl:
        "https://api.polygon.io/v1/reference/company-branding/YXBwbGUuY29t/images/2024-10-01_icon.png",
      listDate: "1980-12-12",
      logoUrl:
        "https://api.polygon.io/v1/reference/company-branding/YXBwbGUuY29t/images/2024-10-01_logo.svg",
      marketCap: 3595474317760,
      name: "Apple Inc.",
      shareClassSharesOutstanding: 15204140000,
      ticker: "AAPL",
      totalEmployees: 161000,
    },
  },
}

export const GET_TICKER_MOCK = {
  data: {
    aggregateBars: {
      ticker: "AAPL",
      results: [
        {
          closePrice: 228.87,
          highestPrice: 229.82,
          lowestPrice: 224.63,
          openPrice: 224.99,
          timestamp: 1726718400000,
        },
        {
          closePrice: 228.2,
          highestPrice: 233.09,
          lowestPrice: 227.62,
          openPrice: 229.97,
          timestamp: 1726804800000,
        },
        {
          closePrice: 226.47,
          highestPrice: 229.45,
          lowestPrice: 225.81,
          openPrice: 227.34,
          timestamp: 1727064000000,
        },
        {
          closePrice: 227.37,
          highestPrice: 229.35,
          lowestPrice: 225.73,
          openPrice: 228.645,
          timestamp: 1727150400000,
        },
        {
          closePrice: 226.37,
          highestPrice: 227.29,
          lowestPrice: 224.02,
          openPrice: 224.93,
          timestamp: 1727236800000,
        },
        {
          closePrice: 227.52,
          highestPrice: 228.5,
          lowestPrice: 225.41,
          openPrice: 227.3,
          timestamp: 1727323200000,
        },
        {
          closePrice: 227.79,
          highestPrice: 229.52,
          lowestPrice: 227.3,
          openPrice: 228.46,
          timestamp: 1727409600000,
        },
        {
          closePrice: 233,
          highestPrice: 233,
          lowestPrice: 229.65,
          openPrice: 230.04,
          timestamp: 1727668800000,
        },
        {
          closePrice: 226.21,
          highestPrice: 229.65,
          lowestPrice: 223.74,
          openPrice: 229.52,
          timestamp: 1727755200000,
        },
        {
          closePrice: 226.78,
          highestPrice: 227.37,
          lowestPrice: 223.02,
          openPrice: 225.89,
          timestamp: 1727841600000,
        },
        {
          closePrice: 225.67,
          highestPrice: 226.805,
          lowestPrice: 223.32,
          openPrice: 225.14,
          timestamp: 1727928000000,
        },
        {
          closePrice: 226.8,
          highestPrice: 228,
          lowestPrice: 224.13,
          openPrice: 227.9,
          timestamp: 1728014400000,
        },
        {
          closePrice: 221.69,
          highestPrice: 225.69,
          lowestPrice: 221.33,
          openPrice: 224.5,
          timestamp: 1728273600000,
        },
        {
          closePrice: 225.77,
          highestPrice: 225.98,
          lowestPrice: 223.25,
          openPrice: 224.3,
          timestamp: 1728360000000,
        },
        {
          closePrice: 229.54,
          highestPrice: 229.75,
          lowestPrice: 224.83,
          openPrice: 225.23,
          timestamp: 1728446400000,
        },
        {
          closePrice: 229.04,
          highestPrice: 229.5,
          lowestPrice: 227.17,
          openPrice: 227.78,
          timestamp: 1728532800000,
        },
        {
          closePrice: 227.55,
          highestPrice: 229.41,
          lowestPrice: 227.34,
          openPrice: 229.3,
          timestamp: 1728619200000,
        },
        {
          closePrice: 231.3,
          highestPrice: 231.73,
          lowestPrice: 228.6,
          openPrice: 228.7,
          timestamp: 1728878400000,
        },
        {
          closePrice: 233.85,
          highestPrice: 237.49,
          lowestPrice: 232.37,
          openPrice: 233.61,
          timestamp: 1728964800000,
        },
        {
          closePrice: 231.78,
          highestPrice: 232.12,
          lowestPrice: 229.84,
          openPrice: 231.6,
          timestamp: 1729051200000,
        },
        {
          closePrice: 232.15,
          highestPrice: 233.85,
          lowestPrice: 230.52,
          openPrice: 233.43,
          timestamp: 1729137600000,
        },
        {
          closePrice: 235,
          highestPrice: 236.18,
          lowestPrice: 234.01,
          openPrice: 236.18,
          timestamp: 1729224000000,
        },
      ],
    },
  },
}
