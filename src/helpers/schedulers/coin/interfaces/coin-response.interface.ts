export interface CoinRes {
  id: number;
  name: string;
  symbol: string;
  category: string;
  description: string;
  slug: string;
  logo: string;
  subreddit: string;
  // url: string;
}

export interface CoinListingsLatest {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  quote: Quote;
}

interface Quote {
  USD: PriceCoin;
}

interface PriceCoin {
  price: number;
}
