export async function fetchStockGrade(ticker: string) {
  const url = `https://financialmodelingprep.com/api/v3/grade/${ticker}?apikey=${process.env.FMP_API_KEY}`
  const options = {
    method: "GET",
    next: {
      revalidate: 3600,
    },
  }
  const res = await fetch(url, options)

  if (!res.ok) {
    console.log("failed to fetch stock grade", res)
    return null
    // throw new Error("Failed to fetch sector performance")
  }
  return res.json()
}

export async function fetchSectorPerformance() {
  const url = `https://financialmodelingprep.com/api/v3/sector-performance?apikey=${process.env.FMP_API_KEY}`
  const options = {
    method: "GET",
    next: {
      revalidate: 3600,
    },
  }
  const res = await fetch(url, options)

  if (!res.ok) {
    return null
    // throw new Error("Failed to fetch sector performance")
  }
  return res.json()
}

export async function fetchNews() {
  const url = `https://financialmodelingprep.com/api/v3/news?apikey=${process.env.FMP_API_KEY}`
}
