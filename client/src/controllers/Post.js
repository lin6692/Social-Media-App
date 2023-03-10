export default class Post {
  async createPost(token, data) {
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    const newPost = await response.json();
    return newPost;
  }

  async getPosts(token) {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const newPosts = await response.json();
    return newPosts;
  }

  async likePost(userId, postId, token) {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
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
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
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
