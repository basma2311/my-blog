import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    content: String,
    rating: {
      type: Number,
      maxLength: 5,
    },
    recipeId: {
      type: mongoose.Types.ObjectId,
      ref: "Recipe",
    },

    answers: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        content: String,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
