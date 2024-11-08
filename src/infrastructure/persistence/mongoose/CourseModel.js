const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  one_time: {
    shift_prices: [
      {
        shift_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Shift",
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
  },
  long_duration: {
    price_per_month: {
      "1_month": { type: Number, required: true, min: 0 },
      "2_months": { type: Number, required: true, min: 0 },
      "3_months": { type: Number, required: true, min: 0 },
      "6_months": { type: Number, required: true, min: 0 },
    },
  },
});

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["One-time", "Long-duration"],
    required: true,
  },
  pricing: {
    type: pricingSchema,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CourseModel = mongoose.model("Course", courseSchema);

module.exports = CourseModel;
