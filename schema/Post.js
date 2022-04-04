import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    id: { type: Number, require: true, unique: true },
    title: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
