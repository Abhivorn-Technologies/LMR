import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    // Allows storing any JSON structure (objects, arrays, strings)
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);
