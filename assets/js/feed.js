let createPost = function() {
  let newPost = $("#new-post");
  newPost.submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/posts/create",
      data: newPost.serialize(),
      success: function(data) {
        let newPost = newPostDom(data.data.post);
        $("#feed-list").append(newPost);
        console.log(newPost);
      },
      error: function(err) {
        console.log(err.respnseText);
      }
    });
  });
};

let newPostDom = function(post) {
  return $(`
      <li>
        <a href="/posts/${post._id}">${post.title}</a>
      </li>
  `);
};

createPost();
