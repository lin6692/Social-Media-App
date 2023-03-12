export default class Comment {
  async addComment(postId, token, body) {
    const url = `https://social-media-server-25d3.onrender.com/posts/${postId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.status !== 200) {
      return false;
    }

    const newComment = await response.json();
    return newComment;
  }

  async getComments(postId, token) {
    const url = `https://social-media-server-25d3.onrender.com/posts/${postId}/comments`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      return false;
    }

    const comments = await response.json();
    return comments;
  }

  async deleteComments(postId, token, body) {
    const url = `https://social-media-server-25d3.onrender.com/posts/${postId}/comment`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.status === 200;
  }
}
