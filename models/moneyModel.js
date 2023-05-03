import mongoose from "mongoose";

const MoneySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  INR: {
    type: Number,
    default: 1000,
  },

  USD: {
    type: Number,
    default: 1000,
  },
});

const Money = mongoose.model("Money", MoneySchema);

export default Money;
