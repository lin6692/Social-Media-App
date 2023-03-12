export default class Auth {
  async createUser(formData) {
    const url = "https://social-media-server-25d3.onrender.com/auth/register";
    const savedUserResponse = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const savedUser = await savedUserResponse.json();
    return savedUser;
  }

  async login(data) {
    const url = "https://social-media-server-25d3.onrender.com/auth/login";
    const loggedInResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const loggedIn = await loggedInResponse.json();
    return loggedIn;
  }
}
