import Crypto from "../models/crypto.js";

// GET /crypto - Fetch all available cryptocurrencies
export async function getAllCryptos(req, res) {
  try {
    const cryptos = await Crypto.find();
    res.status(200).json({ message: "Cryptos fetched successfully", cryptos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// GET /crypto/gainers - Top gainers sorted highest to lowest
export async function getTopGainers(req, res) {
  try {
    const cryptos = await Crypto.find({ change24h: { $gt: 0 } }).sort({ change24h: -1 });
    res.status(200).json({ message: "Top gainers fetched successfully", cryptos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// GET /crypto/new - New listings sorted newest to oldest
export async function getNewListings(req, res) {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "New listings fetched successfully", cryptos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// POST /crypto - Add a new cryptocurrency
export async function addCrypto(req, res) {
  const { name, symbol, price, image, change24h } = req.body;
  if (!name || !symbol || !price || !image || change24h === undefined) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const crypto = await Crypto.create({ name, symbol, price, image, change24h });
    res.status(201).json({ message: "Crypto created successfully", crypto });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
