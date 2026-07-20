import mongoose from 'mongoose';

const PageMetadataSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Page', 'Tool', 'Global', 'Page Section', 'List'],
      default: 'Page'
    },
    icon: {
      type: String,
      required: true,
      default: 'FileText' // Used to dynamically render lucide-react icons
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Draft', 'Archived'],
      default: 'Active'
    },
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PageMetadata || mongoose.model('PageMetadata', PageMetadataSchema);
