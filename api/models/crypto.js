import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  change24h: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Crypto = mongoose.model("Crypto", schema);

export default Crypto;
