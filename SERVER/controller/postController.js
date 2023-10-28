import Post from "../model/post.js";

export const createPost = async (req, res) => {
  try {
    const post = await new Post(req.body);
    post.save();

    res.status(201).json({ msg: "Post created" });
  } catch (error) {
    res.status(500).json({ msg: "Unable to create post", error });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    let category = req.query.category;
    let posts;
    if (category) {
      posts = await Post.find({ category: category });
    } else {
      posts = await Post.find({});
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ msg: "Unable to get all posts", error });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ msg: "Post not found for given id" });

    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "unable to find post for given id", error });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ msg: "Post not found for given id" });

    await Post.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.status(200).json({ msg: "Post updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "unable to update post for given id", error });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ msg: "Post not found for given id" });

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({msg: "post deleted successfully"});
  } catch (error) {
    res
      .status(500)
      .json({ msg: "unable to update post for given id", error });
  }
};
