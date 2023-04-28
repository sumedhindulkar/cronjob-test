const mongoose = require("mongoose");

const sraLeadSchema = new mongoose.Schema({
  text: { type: String },
  url: { type: String },
});

const SraLeads = mongoose.model("sraLeads", sraLeadSchema);

const sraSchema = new mongoose.Schema(
  {
    campaignName: { type: String },
    negativeKeywords: [{ type: String }],
    searchQueries: [{ type: String }],
    keywords: [{ type: String }],
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "sraLeads" }],
    leads: [sraLeadSchema],
    isActive: { type: Boolean, default: false },
    type: {
      string: { type: Boolean, default: true },
      regex: { type: Boolean, default: false },
      caseSensitive: { type: Boolean, default: false },
      wordMatch: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

const Sra = mongoose.model("sra", sraSchema);

module.exports = { Sra, sraSchema };
