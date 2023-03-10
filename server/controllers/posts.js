import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

const sortFunc = (post1, post2) => {
  let dateA = new Date(post1.createdAt).valueOf();
  let dateB = new Date(post2.createdAt).valueOf();
  return dateA < dateB ? 1 : -1;
};

const deleteComments = async (comments) => {
  comments.map(async (comment) => {
    let result = await Comment.deleteOne({ _id: comment });
    if (result.deletedCount !== 1) {
      res.status(404).json({ message: "No Comment Found" });
    }
  });
};

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const createPostComment = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const { id } = req.params;

    const newComment = new Comment({
      postId: id,
      userId,
      description,
    });
    const savedComment = await newComment.save();

    const post = await Post.findById(id);
    post.comments.push(savedComment._id);
    await post.save();

    res.status(200).json(savedComment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    post.sort(sortFunc);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    post.sort(sortFunc);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ postId: id });
    res.status(200).json(comments);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);

    if (userId !== post.userId) {
      res
        .status(404)
        .json({ message: "Only post creator can delete the post." });
    }

    await deleteComments(post.comments);

    const result = await Post.deleteOne(post);
    if (result.deletedCount !== 1) {
      res.status(404).json({ message: "No Post Found" });
    }

    res.status(200).json({ message: "Post deleted." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, commentId } = req.body;
    const post = await Post.findById(id);
    const comment = await Comment.findById(commentId);

    if (userId !== comment.userId && userId !== post.userId) {
      res.status(404).json({ message: "Have no right to delete this comment" });
    }

    // Remove from the post list
    const newComments = post.comments.filter(
      (id) => id.toString() !== commentId
    );
    post.comments = newComments;
    await post.save();

    // Remove from Comment
    const result = await Comment.deleteOne(comment);
    if (result.deletedCount !== 1) {
      res.status(404).json({ message: "No Post Found" });
    }

    const comments = await Comment.find({ postId: id });
    res.status(200).json(comments);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
