const Post = require("../model/Post");

exports.createPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No media file uploaded" });
    }

    const { description } = req.body;

    const newPost = new Post({
      userId: req.user.id,
      mediaUrl: `/uploads/${req.file.filename}`,
      mediaType: req.file.mimetype.startsWith("video") ? "video" : "image",
      description
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully!", post: newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ensure the name is exactly 'likePost'
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } });
      res.json({ message: "Post liked" });
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
      res.json({ message: "Post unliked" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ensure the name is exactly 'addComment'
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.comments.push({ userId: req.user.id, text });
    await post.save();
    res.json({ message: "Comment added", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};