const Post = require("../model/Post");

exports.createPost = async (req, res) => {
  try {
    console.log('📥 Create Post Request');
    console.log('   User ID:', req.user?.id);
    console.log('   Body:', req.body);
    console.log('   File:', req.file);
   
    const { title, category, description } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        error: "User not authenticated - req.user.id is missing",
      });
    }

    if (!title || !category) {
      return res.status(400).json({
        error: "Title and Category are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "Media file is required",
      });
    }

    const mediaType = req.file.mimetype.startsWith("video")
      ? "video"
      : "image";

    const newPost = new Post({
      userId: req.user.id,
      title,
      category,
      description: description || "",
      mediaUrl: `/uploads/${req.file.filename}`,
      mediaType,
    });

    await newPost.save();

    const populatedPost = await newPost.populate(
      "userId",
      "username email"
    );

    res.status(201).json({
      message: "Post created successfully",
      post: populatedPost,
    });
  } catch (err) {
    console.error("❌ Create Post Error:", err);
    console.error("   Error message:", err.message);
    console.error("   Error stack:", err.stack);
    res.status(500).json({ error: err.message });
  }
};
// ===============================
// GET ALL POSTS (PUBLIC FEED)
// ===============================
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username email")
      .populate("comments.userId", "username")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error("❌ Get Posts Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// LIKE / UNLIKE POST
// ===============================
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userId = req.user.id;

    const index = post.likes.findIndex(
      (id) => id.toString() === userId
    );

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();

    res.json({
      message: index === -1 ? "Post liked" : "Post unliked",
      likesCount: post.likes.length,
    });
  } catch (err) {
    console.error("❌ Like Post Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// ADD COMMENT
// ===============================
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        error: "Comment text is required",
      });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push({
      userId: req.user.id,
      text: text.trim(),
    });

    await post.save();

    const updatedPost = await post.populate(
      "comments.userId",
      "username"
    );

    res.json({
      message: "Comment added successfully",
      post: updatedPost,
    });
  } catch (err) {
    console.error("❌ Add Comment Error:", err);
    res.status(500).json({ error: err.message });
  }
};
