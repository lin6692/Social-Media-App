export default class Post {
  async createPost(token, data) {
    const url = "https://social-media-server-25d3.onrender.com/posts";
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    const newPost = await response.json();
    return newPost;
  }

  async getPosts(token) {
    const url = "https://social-media-server-25d3.onrender.com/posts";
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const newPosts = await response.json();
    return newPosts;
  }

  async likePost(userId, postId, token) {
    const url = `https://social-media-server-25d3.onrender.com/posts/${postId}/like`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });
    const updatedPost = await response.json();
    return updatedPost;
  }

  async deletePost(userId, postId, token) {
    const url = `https://social-media-server-25d3.onrender.com/posts/${postId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });
    return response.status === 200;
  }
}
