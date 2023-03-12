export default class User {
  async getUser(userId, token) {
    const url = `https://social-media-server-25d3.onrender.com/users/${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await response.json();
    return user;
  }

  async getFriends(userId, token) {
    const url = `https://social-media-server-25d3.onrender.com/users/${userId}/friends`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const friends = await response.json();
    return friends;
  }

  async patchFriend(userId, token, friendId) {
    const url = `https://social-media-server-25d3.onrender.com/users/${userId}/${friendId}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      return false;
    }

    const friends = await response.json();
    return friends;
  }
}
