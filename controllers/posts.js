const User = require("../models/user");
const Post = require("../models/posts");
const Comment = require("../models/comments");

module.exports.create_post = async function(req, res) {
  try {
    let post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user._id
    });
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post
        },
        message: "Post created"
      });
    }
    console.log("Post added", post);
    res.redirect("back");
    // A back redirect, which allows you to redirect a request back from whence it came from
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.show_post = async function(req, res) {
  let post = await Post.findById(req.params.id)
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user"
      }
    });
  return res.render("post", {
    title: "Profile",
    post: post
  });
};

module.exports.comment_post = async function(req, res) {
  let comment;
  const post = await Post.findById(req.body.post);
  if (post) {
    comment = await Comment.create({
      content: req.body.comment,
      user: req.user._id,
      post: req.body.post
    });

    post.comments.push(comment);
    post.save();
    if (req.xhr) {
      return res.status(200).json({
        data: {
          comment: comment,
          user: req.user.username
        },
        message: "Post created"
      });
    }
    console.log("Comment added");
    return res.redirect("back");
  }
};

module.exports.delete_post = function(req, res) {
  Post.findByIdAndDelete(req.params.id, function(err, post) {
    // .id means converting the object id into string (.id is string version of ._id)
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, function(err) {
        return res.redirect("/feed");
      });
    } else {
      return res.redirect("/feed");
    }
  });
};

module.exports.delete_comment = async function(req, res) {
  const comment = await Comment.findById(req.params.id);
  if (comment.user == req.user.id) {
    let postID = comment.post;
    comment.remove();
    await Post.findByIdAndUpdate(postID, {
      $pull: {
        comments: req.params.id
      }
    });

    return res.redirect("back");
  }
};
