import Comment from "../model/comment.js";

export const addComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    comment.save();

    res.status(201).json({ msg: "Comment saved successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Unable to add comment", error });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ msg: "Unable to get comments", error });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment)
      return res.status(404).json({ msg: "Comment not found for given id" });

    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Unable to get comments", error });
  }
};
