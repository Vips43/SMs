import mongoose from "mongoose";

const timeStringRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const timeField = {
  type: String,
  required: true,
  trim: true,
  match: [timeStringRegex, "Time must be in HH:mm format (e.g., 10:00)"],
};

const dutySchema = new mongoose.Schema(
  {
    date: { type: Date, default: null },
    startTime: timeField,
    endTime: timeField,
    instruction: { type: String, default: "", trim: true },
    site: { type: mongoose.Schema.Types.ObjectId, ref: "Site", default: null },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, id: false },
    toObject: { virtuals: true, id: false },
  },
);

dutySchema.index({ user: 1, createdAt: -1 });

const Duty = mongoose.model("Duty", dutySchema);

export default Duty;