export default class User {
  async getUser(userId, token) {
    const response = await fetch(`${process.env.SERVER_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await response.json();
    return user;
  }

  async getFriends(userId, token) {
    const response = await fetch(
      `${process.env.SERVER_URL}/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const friends = await response.json();
    return friends;
  }

  async patchFriend(userId, token, friendId) {
    const response = await fetch(
      `${process.env.SERVER_URL}/users/${userId}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      return false;
    }

    const friends = await response.json();
    return friends;
  }
}
