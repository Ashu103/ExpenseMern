import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  type: { type: String, default: "Investment" },
  color: { type: String, default: "#FCBE44" },
});

const category = mongoose.model("Category", categoriesSchema);

const transactionSchema = new mongoose.Schema({
  name: { type: String, default: "Anonymous" },

  type: { type: String, default: "Investment" },

  /*
  type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },*/
  amount: { type: Number },

  date: { type: Date, default: Date.now },
});

const transaction = mongoose.model("Transaction", transactionSchema);

export { category, transaction };
