const Post = require("../model/Post");

// Create a new post with Title and Category
exports.createPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No media file uploaded" });
    }

    const { title, category, description } = req.body;

    // Validation for new fields
    if (!title || !category) {
      return res.status(400).json({ error: "Title and Category are required" });
    }

    const newPost = new Post({
      userId: req.user.id, // Comes from authMiddleware
      title,
      category,
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

// Get all posts for the feed
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username email")
      .populate("comments.userId", "username") // Populate usernames in comments too
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like or Unlike a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const userId = req.user.id;

    if (!post.likes.includes(userId)) {
      // Like
      post.likes.push(userId);
      await post.save();
      res.json({ message: "Post liked", likesCount: post.likes.length });
    } else {
      // Unlike
      post.likes = post.likes.filter((id) => id.toString() !== userId);
      await post.save();
      res.json({ message: "Post unliked", likesCount: post.likes.length });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Comment text is required" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.comments.push({ userId: req.user.id, text });
    await post.save();
    
    res.json({ message: "Comment added", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};