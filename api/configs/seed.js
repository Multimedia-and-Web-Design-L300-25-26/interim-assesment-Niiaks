import Crypto from "../models/crypto.js";

const seedData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 67432.15,
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    change24h: 2.5
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3521.80,
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    change24h: 4.1
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 178.45,
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    change24h: 7.3
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 0.62,
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    change24h: -1.2
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.15,
    image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    change24h: -3.4
  },
  {
    name: "Ripple",
    symbol: "XRP",
    price: 0.58,
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    change24h: 1.8
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    price: 8.92,
    image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    change24h: 5.6
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    price: 42.30,
    image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    change24h: 3.9
  }
];

export async function seedCryptos() {
  try {
    const count = await Crypto.countDocuments();
    if (count > 0) {
      console.log("Crypto collection already seeded, skipping");
      return;
    }
    await Crypto.insertMany(seedData);
    console.log("Seeded crypto collection with", seedData.length, "entries");
  } catch (error) {
    console.log("Error seeding crypto data:", error);
  }
}
