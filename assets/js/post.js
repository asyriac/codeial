let createComment = function() {
  let newPost = $("#new-comment");
  newPost.submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/posts/add-comment",
      data: newPost.serialize(),
      success: function(data) {
        let newComment = newCommentDom(data.data.comment, data.data.user);
        $("#comment-list").append(newComment);
      },
      error: function(err) {
        console.log(err.respnseText);
      }
    });
  });
};

let newCommentDom = function(comment, user) {
  return $(`
    <li>
        <a href="/posts/delete-comment/${comment._id}">Delete Comment</a>
        ${comment.content} <small>Comment by: ${user}</small>
    </li>
  `);
};

$(document).ready(function() {
  $("ul#comment-list li a").click(function(e) {
    e.preventDefault();
    console.log($("ul#comment-list li a").prop("href"));
    // $.ajax({
    //   type: "get",
    //   url: comment.prop("href"),
    //   success: function(data) {
    //     console.log(data);
    //   },
    //   error: function(err) {
    //     console.log(err.respnseText);
    //   }
    // });
  });
});

createComment();
