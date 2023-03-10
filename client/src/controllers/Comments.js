export default class Comment {
  async addComment(postId, token, body) {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
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
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comments`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      return false;
    }

    const comments = await response.json();
    return comments;
  }

  async deleteComments(postId, token, body) {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comment`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return response.status === 200;
  }
}
