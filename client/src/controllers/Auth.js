export default class Auth {
  async createUser(data) {
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const savedUser = await savedUserResponse.json();
    return savedUser;
  }

  async login(data) {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const loggedIn = await loggedInResponse.json();
    return loggedIn;
  }
}
